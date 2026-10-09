
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Add a unique constraint to the company and employee IDs.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.addConstraint(
        "employees",
        "employees_company_id_id_unique",
        {
            unique: ["company_id", "id"],
        }
    );
};

/**
 * Remove the unique constraint.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropConstraint(
        "employees",
        "employees_company_id_id_unique"
    );
};