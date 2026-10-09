
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create the audit_logs table.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable("audit_logs", {
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

        user_id: {
            type: "uuid",
            notNull: false,
            references: "users",
            onDelete: "SET NULL",
        },

        action: {
            type: "varchar(100)",
            notNull: true,
        },

        entity_type: {
            type: "varchar(100)",
            notNull: true,
        },

        entity_id: {
            type: "uuid",
            notNull: false,
        },

        details: {
            type: "jsonb",
            notNull: true,
            default: pgm.func("'{}'::jsonb"),
        },

        ip_address: {
            type: "inet",
            notNull: false,
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("CURRENT_TIMESTAMP"),
        },
    });

    pgm.createIndex("audit_logs", ["company_id", "created_at"]);
    pgm.createIndex("audit_logs", ["user_id", "created_at"]);
    pgm.createIndex("audit_logs", ["entity_type", "entity_id"]);
};

/**
 * Roll back the audit_logs migration.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable("audit_logs");
};