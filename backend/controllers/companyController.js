
const pool = require("../config/database");

async function getCompanies(req, res) {
    try {
        const result = await pool.query(`
            SELECT
                id,
                name,
                domain,
                email_provider,
                status,
                created_at
            FROM companies
            ORDER BY created_at DESC
        `);

        return res.status(200).json({
            data: result.rows,
            count: result.rowCount
        });
    } catch (error) {
        console.error("Error retrieving companies:", error);

        return res.status(500).json({
            message: "Failed to retrieve companies."
        });
    }
}

async function createCompany(req, res) {
    try {
        const {
            name,
            domain,
            email_provider = "mock"
        } = req.body;

        // 1. Validate company name
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Company name is required."
            });
        }

        if (name.trim().length > 150) {
            return res.status(400).json({
                message: "Company name cannot exceed 150 characters."
            });
        }

        // 2. Validate domain
        if (
            domain !== undefined &&
            domain !== null &&
            typeof domain !== "string"
        ) {
            return res.status(400).json({
                message: "Domain must be a string."
            });
        }

        const normalizedDomain =
            typeof domain === "string" && domain.trim()
                ? domain.trim()
                : null;

        if (normalizedDomain && normalizedDomain.length > 255) {
            return res.status(400).json({
                message: "Domain cannot exceed 255 characters."
            });
        }

        // 3. Validate email provider
        const allowedProviders = [
            "mock",
            "microsoft",
            "google"
        ];

        if (!allowedProviders.includes(email_provider)) {
            return res.status(400).json({
                message:
                    "Invalid email provider. Allowed values: mock, microsoft, google."
            });
        }

        // 4. Insert the company into PostgreSQL
        const result = await pool.query(
            `
                INSERT INTO companies (
                    name,
                    domain,
                    email_provider
                )
                VALUES ($1, $2, $3)
                RETURNING
                    id,
                    name,
                    domain,
                    email_provider,
                    status,
                    created_at,
                    updated_at
            `,
            [
                name.trim(),
                normalizedDomain,
                email_provider
            ]
        );

        // 5. Return the newly created company
        return res.status(201).json({
            message: "Company created successfully.",
            data: result.rows[0]
        });

    } catch (error) {
        // PostgreSQL error code 23505 = unique constraint violation
        if (error.code === "23505") {
            return res.status(409).json({
                message:
                    "A company with this domain already exists."
            });
        }

        console.error("Error creating company:", error);

        return res.status(500).json({
            message: "Failed to create company."
        });
    }
}

module.exports = {
    getCompanies,
    createCompany
};