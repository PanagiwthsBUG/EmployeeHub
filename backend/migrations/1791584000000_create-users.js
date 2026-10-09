
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create the users table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable("users", {
        id: {
            type: "uuid",
            primaryKey: true,
            notNull: true,
            default: pgm.func("gen_random_uuid()"),
        },

        company_id: {
            type: "uuid",
            notNull: true,
            references: "companies",
            onDelete: "RESTRICT",
        },

        employee_id: {
            type: "uuid",
            notNull: false,
            unique: true,
        },

        email: {
            type: "varchar(255)",
            notNull: true,
        },

        password_hash: {
            type: "varchar(255)",
            notNull: true,
        },

        role: {
            type: "varchar(30)",
            notNull: true,
            check: "role IN ('SUPER_ADMIN', 'COMPANY_ADMIN', 'EMPLOYEE')",
        },

        status: {
            type: "varchar(20)",
            notNull: true,
            default: "active",
            check: "status IN ('active', 'disabled')",
        },

        last_login_at: {
            type: "timestamptz",
            notNull: false,
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("CURRENT_TIMESTAMP"),
        },

        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("CURRENT_TIMESTAMP"),
        },
    });

    // Each email address must be unique within its company.
    pgm.addConstraint(
        "users",
        "users_company_email_unique",
        {
            unique: ["company_id", "email"],
        }
    );

    // An employee account must reference an employee of the same company.
    pgm.addConstraint(
        "users",
        "users_company_employee_fk",
        {
            foreignKeys: {
                columns: ["company_id", "employee_id"],
                references: "employees(company_id, id)",
                match: "SIMPLE",
                onDelete: "RESTRICT",
            },
        }
    );

    pgm.createIndex("users", "company_id");
};

/**
 * Roll back the users migration.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable("users");
};