const express = require("express");

const {
    getEmployees,
    createEmployee,
    updateEmployee,
} = require("../controllers/employeeController");

const router = express.Router({ mergeParams: true });

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);

module.exports = router;