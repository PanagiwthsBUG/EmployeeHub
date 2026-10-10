const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

require("dotenv").config();

const pool = require("./config/database");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/companies", companyRoutes);

app.use(
    "/api/companies/:companyId/departments",
    departmentRoutes
);

app.get("/", (req, res) => {
    res.json({
        message: "EmployeeHub API is running!"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connection successful!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed!"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});