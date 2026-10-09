
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create the companies table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable("companies", {
        id: {
            type: "uuid",
            primaryKey: true,
            notNull: true,
            default: pgm.func("gen_random_uuid()"),
        },

        name: {
            type: "varchar(150)",
            notNull: true,
        },

        domain: {
            type: "varchar(255)",
            unique: true,
        },

        email_provider: {
            type: "varchar(30)",
            notNull: true,
            default: "mock",
            check: "email_provider IN ('mock', 'microsoft', 'google')",
        },

        status: {
            type: "varchar(20)",
            notNull: true,
            default: "active",
            check: "status IN ('active', 'suspended')",
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
};

/**
 * Drop the companies table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable("companies");
};