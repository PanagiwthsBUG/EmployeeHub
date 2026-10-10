
const pool = require("../config/database");

async function getDepartments(req, res) {
    try {
        const { companyId } = req.params;
        console.log("Route params:", req.params);
        console.log("Company ID:", companyId);

        // 1. Validate company UUID
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID."
            });
        }

        // 2. Check whether the company exists
        const companyResult = await pool.query(
            "SELECT id FROM companies WHERE id = $1",
            [companyId]
        );

        if (companyResult.rowCount === 0) {
            return res.status(404).json({
                message: "Company not found."
            });
        }

        // 3. Retrieve departments belonging to this company
        const result = await pool.query(
            `
                SELECT
                    id,
                    company_id,
                    name,
                    description,
                    created_at,
                    updated_at
                FROM departments
                WHERE company_id = $1
                ORDER BY name ASC
            `,
            [companyId]
        );

        return res.status(200).json({
            data: result.rows,
            count: result.rowCount
        });

    } catch (error) {
        console.error("Error retrieving departments:", error);

        return res.status(500).json({
            message: "Failed to retrieve departments."
        });
    }
}


async function createDepartment(req, res) {
    try {
        const { companyId } = req.params;
        const { name, description = null } = req.body;

        // 1. Validate company UUID
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID."
            });
        }

        // 2. Validate department name
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Department name is required."
            });
        }

        const normalizedName = name.trim();

        if (normalizedName.length > 100) {
            return res.status(400).json({
                message:
                    "Department name cannot exceed 100 characters."
            });
        }

        // 3. Validate description
        if (
            description !== null &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                message: "Description must be a string or null."
            });
        }

        // 4. Check whether the company exists
        const companyResult = await pool.query(
            "SELECT id FROM companies WHERE id = $1",
            [companyId]
        );

        if (companyResult.rowCount === 0) {
            return res.status(404).json({
                message: "Company not found."
            });
        }

        // 5. Insert the department
        const result = await pool.query(
            `
                INSERT INTO departments (
                    company_id,
                    name,
                    description
                )
                VALUES ($1, $2, $3)
                RETURNING
                    id,
                    company_id,
                    name,
                    description,
                    created_at,
                    updated_at
            `,
            [
                companyId,
                normalizedName,
                description === null
                    ? null
                    : description.trim()
            ]
        );

        // 6. Return the created department
        return res.status(201).json({
            message: "Department created successfully.",
            data: result.rows[0]
        });

    } catch (error) {
        // PostgreSQL unique constraint violation
        if (error.code === "23505") {
            return res.status(409).json({
                message:
                    "A department with this name already exists in this company."
            });
        }

        console.error("Error creating department:", error);

        return res.status(500).json({
            message: "Failed to create department."
        });
    }
}

module.exports = {
    getDepartments,
    createDepartment
};