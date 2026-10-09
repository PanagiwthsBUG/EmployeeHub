
require("dotenv").config();

const {
    DB_USER,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
} = process.env;

if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASSWORD || !DB_PORT) {
    throw new Error("Missing required database environment variables.");
}

module.exports = {
    databaseUrl: `postgres://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    migrationsTable: "pgmigrations",
    dir: "migrations",
};