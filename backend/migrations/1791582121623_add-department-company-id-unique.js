
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Add a unique constraint for company and department IDs.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.addConstraint(
        "departments",
        "departments_company_id_id_unique",
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
        "departments",
        "departments_company_id_id_unique"
    );
};