
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create the departments table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable("departments", {
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
            onDelete: "CASCADE",
        },
        name: {
            type: "varchar(100)",
            notNull: true,
        },
        description: {
            type: "text",
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

    // A department name must be unique within its company.
    pgm.addConstraint(
        "departments",
        "departments_company_name_unique",
        {
            unique: ["company_id", "name"],
        }
    );

    pgm.addConstraint(
        "departments",
        "departments_company_id_id_unique",
        {
            unique: ["company_id", "id"],
        }
    );

    // Speeds up queries that retrieve a company's departments.
    pgm.createIndex("departments", "company_id");
};

/**
 * Roll back the departments migration.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable("departments");
};