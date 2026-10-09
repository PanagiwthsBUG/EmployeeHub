
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create the employees table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable("employees", {
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

        department_id: {
            type: "uuid",
            notNull: false,
        },

        first_name: {
            type: "varchar(100)",
            notNull: true,
        },

        last_name: {
            type: "varchar(100)",
            notNull: true,
        },

        work_email: {
            type: "varchar(255)",
            notNull: false,
        },

        job_title: {
            type: "varchar(150)",
            notNull: false,
        },

        hire_date: {
            type: "date",
            notNull: false,
        },

        employment_status: {
            type: "varchar(20)",
            notNull: true,
            default: "active",
            check: "employment_status IN ('active', 'on_leave', 'terminated')",
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

    // Ensure that a department belongs to the same company as its employee.
    pgm.addConstraint(
        "employees",
        "employees_company_department_fk",
        {
            foreignKeys: {
                columns: ["company_id", "department_id"],
                references: "departments(company_id, id)",
                match: "SIMPLE",
                onDelete: "RESTRICT",
            },
        }
    );

    // Improve queries filtering employees by company and department.
    pgm.createIndex("employees", "company_id");
    pgm.createIndex("employees", "department_id");
};

/**
 * Roll back the employees migration.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable("employees");
};