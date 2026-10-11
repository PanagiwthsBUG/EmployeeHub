
const pool = require("../config/database");

// GET /api/companies/:companyId/employees
const getEmployees = async (req, res) => {
    try {
        const { companyId } = req.params;

        // Validate the company UUID.
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID."
            });
        }

        // Check whether the company exists.
        const companyResult = await pool.query(
            "SELECT id FROM companies WHERE id = $1",
            [companyId]
        );

        if (companyResult.rowCount === 0) {
            return res.status(404).json({
                message: "Company not found."
            });
        }

        // Retrieve employees belonging to this company.
        const employeesResult = await pool.query(
            `SELECT
                e.id,
                e.company_id,
                e.department_id,
                d.name AS department_name,
                e.first_name,
                e.last_name,
                e.work_email,
                e.job_title,
                e.hire_date::text AS hire_date,
                e.employment_status,
                e.created_at,
                e.updated_at
            FROM employees AS e
            LEFT JOIN departments AS d
                ON d.id = e.department_id
                AND d.company_id = e.company_id
            WHERE e.company_id = $1
            ORDER BY e.last_name ASC, e.first_name ASC`,
            [companyId]
        );

        return res.status(200).json({
            data: employeesResult.rows,
            count: employeesResult.rowCount
        });
    } catch (error) {
        console.error("Error fetching employees:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while fetching employees."
        });
    }
};


const createEmployee = async (req, res) => {
    try {
        const { companyId } = req.params;

        const {
            first_name,
            last_name,
            department_id = null,
            work_email = null,
            job_title = null,
            hire_date = null,
            employment_status = "active"
        } = req.body;

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Validate company ID.
        if (!uuidRegex.test(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID."
            });
        }

        // Validate required fields.
        if (
            typeof first_name !== "string" ||
            !first_name.trim() ||
            typeof last_name !== "string" ||
            !last_name.trim()
        ) {
            return res.status(400).json({
                message: "First name and last name are required."
            });
        }

        const firstName = first_name.trim();
        const lastName = last_name.trim();

        if (firstName.length > 100 || lastName.length > 100) {
            return res.status(400).json({
                message: "First name and last name must not exceed 100 characters."
            });
        }

        // Validate optional text fields.
        if (
            work_email !== null &&
            (typeof work_email !== "string" || work_email.trim().length > 255)
        ) {
            return res.status(400).json({
                message: "Work email must be a string of at most 255 characters."
            });
        }

        if (
            job_title !== null &&
            (typeof job_title !== "string" || job_title.trim().length > 150)
        ) {
            return res.status(400).json({
                message: "Job title must be a string of at most 150 characters."
            });
        }

        const workEmail = work_email?.trim() || null;
        const jobTitle = job_title?.trim() || null;

        // Basic email format validation.
        if (
            workEmail !== null &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)
        ) {
            return res.status(400).json({
                message: "Invalid work email format."
            });
        }

        // Validate department ID when provided.
        if (department_id !== null && !uuidRegex.test(department_id)) {
            return res.status(400).json({
                message: "Invalid department ID."
            });
        }

        // Validate hire date when provided.
        if (hire_date !== null) {
            if (
                typeof hire_date !== "string" ||
                !/^\d{4}-\d{2}-\d{2}$/.test(hire_date)
            ) {
                return res.status(400).json({
                    message: "Hire date must use YYYY-MM-DD format."
                });
            }

            const parsedDate = new Date(`${hire_date}T00:00:00.000Z`);

            if (
                Number.isNaN(parsedDate.getTime()) ||
                parsedDate.toISOString().slice(0, 10) !== hire_date
            ) {
                return res.status(400).json({
                    message: "Invalid hire date."
                });
            }
        }

        const allowedStatuses = ["active", "on_leave", "terminated"];

        if (!allowedStatuses.includes(employment_status)) {
            return res.status(400).json({
                message: "Invalid employment status."
            });
        }

        // Verify that the company exists.
        const companyResult = await pool.query(
            "SELECT id FROM companies WHERE id = $1",
            [companyId]
        );

        if (companyResult.rowCount === 0) {
            return res.status(404).json({
                message: "Company not found."
            });
        }

        // Verify that the department belongs to this company.
        if (department_id !== null) {
            const departmentResult = await pool.query(
                `SELECT id
                 FROM departments
                 WHERE id = $1 AND company_id = $2`,
                [department_id, companyId]
            );

            if (departmentResult.rowCount === 0) {
                return res.status(400).json({
                    message: "Department does not belong to this company."
                });
            }
        }

        // Create the employee.
        const result = await pool.query(
            `INSERT INTO employees (
                company_id,
                department_id,
                first_name,
                last_name,
                work_email,
                job_title,
                hire_date,
                employment_status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING
                id,
                company_id,
                department_id,
                first_name,
                last_name,
                work_email,
                job_title,
                hire_date::text AS hire_date,
                employment_status,
                created_at,
                updated_at`,
            [
                companyId,
                department_id,
                firstName,
                lastName,
                workEmail,
                jobTitle,
                hire_date,
                employment_status
            ]
        );

        return res.status(201).json({
            message: "Employee created successfully.",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error creating employee:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while creating the employee."
        });
    }
};


async function updateEmployee(req, res) {
    const { companyId, employeeId } = req.params;

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(companyId) || !uuidRegex.test(employeeId)) {
        return res.status(400).json({
            message: "Invalid company ID or employee ID.",
        });
    }

    const {
        first_name,
        last_name,
        department_id = null,
        work_email = null,
        job_title = null,
        hire_date = null,
        employment_status = "active",
    } = req.body;

    // Validate required fields.
    if (
        typeof first_name !== "string" ||
        !first_name.trim() ||
        typeof last_name !== "string" ||
        !last_name.trim()
    ) {
        return res.status(400).json({
            message: "First name and last name are required.",
        });
    }

    const firstName = first_name.trim();
    const lastName = last_name.trim();

    if (firstName.length > 100 || lastName.length > 100) {
        return res.status(400).json({
            message: "First name and last name must not exceed 100 characters.",
        });
    }

    // Validate optional text fields.
    if (
        work_email !== null &&
        typeof work_email !== "string"
    ) {
        return res.status(400).json({
            message: "Work email must be a string or null.",
        });
    }

    if (
        job_title !== null &&
        typeof job_title !== "string"
    ) {
        return res.status(400).json({
            message: "Job title must be a string or null.",
        });
    }

    const workEmail = work_email?.trim() || null;
    const jobTitle = job_title?.trim() || null;

    if (workEmail && workEmail.length > 255) {
        return res.status(400).json({
            message: "Work email must not exceed 255 characters.",
        });
    }

    if (workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
        return res.status(400).json({
            message: "Invalid work email format.",
        });
    }

    if (jobTitle && jobTitle.length > 150) {
        return res.status(400).json({
            message: "Job title must not exceed 150 characters.",
        });
    }

    // Validate department.
    if (
        department_id !== null &&
        (typeof department_id !== "string" ||
            !uuidRegex.test(department_id))
    ) {
        return res.status(400).json({
            message: "Invalid department ID.",
        });
    }

    // Validate hire date.
    if (hire_date !== null) {
        if (
            typeof hire_date !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(hire_date)
        ) {
            return res.status(400).json({
                message: "Hire date must use YYYY-MM-DD format.",
            });
        }

        const parsedDate = new Date(`${hire_date}T00:00:00.000Z`);

        if (
            Number.isNaN(parsedDate.getTime()) ||
            parsedDate.toISOString().slice(0, 10) !== hire_date
        ) {
            return res.status(400).json({
                message: "Invalid calendar date.",
            });
        }
    }

    // Validate employment status.
    const allowedStatuses = ["active", "on_leave", "terminated"];

    if (!allowedStatuses.includes(employment_status)) {
        return res.status(400).json({
            message: "Invalid employment status.",
        });
    }

    try {
        // Verify that the company exists.
        const companyResult = await pool.query(
            "SELECT id FROM companies WHERE id = $1",
            [companyId]
        );

        if (companyResult.rowCount === 0) {
            return res.status(404).json({
                message: "Company not found.",
            });
        }

        // Verify that the employee belongs to this company.
        const employeeResult = await pool.query(
            `SELECT id
             FROM employees
             WHERE id = $1 AND company_id = $2`,
            [employeeId, companyId]
        );

        if (employeeResult.rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found in this company.",
            });
        }

        // If a department was supplied, verify its company ownership.
        if (department_id !== null) {
            const departmentResult = await pool.query(
                `SELECT id
                 FROM departments
                 WHERE id = $1 AND company_id = $2`,
                [department_id, companyId]
            );

            if (departmentResult.rowCount === 0) {
                return res.status(400).json({
                    message: "Department does not belong to this company.",
                });
            }
        }

        // Update the employee.
        const result = await pool.query(
            `UPDATE employees
             SET
                 first_name = $1,
                 last_name = $2,
                 department_id = $3,
                 work_email = $4,
                 job_title = $5,
                 hire_date = $6,
                 employment_status = $7,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $8 AND company_id = $9
             RETURNING
                 id,
                 company_id,
                 department_id,
                 first_name,
                 last_name,
                 work_email,
                 job_title,
                 hire_date::text AS hire_date,
                 employment_status,
                 created_at,
                 updated_at`,
            [
                firstName,
                lastName,
                department_id,
                workEmail,
                jobTitle,
                hire_date,
                employment_status,
                employeeId,
                companyId,
            ]
        );

        return res.status(200).json({
            message: "Employee updated successfully.",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating employee:", error);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee
};