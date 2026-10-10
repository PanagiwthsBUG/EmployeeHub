
const express = require("express");

const {
    getCompanies,
    createCompany
} = require("../controllers/companyController");

const router = express.Router();

router.get("/", getCompanies);
router.post("/", createCompany);

module.exports = router;