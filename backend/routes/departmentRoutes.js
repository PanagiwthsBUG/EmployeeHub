
const express = require("express");

const {
    getDepartments,
    createDepartment
} = require("../controllers/departmentController");

const router = express.Router({ mergeParams: true });

router.get("/", getDepartments);
router.post("/", createDepartment);

module.exports = router;