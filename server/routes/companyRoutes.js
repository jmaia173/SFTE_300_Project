import express from "express"
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middleware/authMiddleware.js"

const router = express.Router()

// register a company
router.post("/register", upload.single("image"), registerCompany)

// company login
router.post("/login", loginCompany)

// get company data
router.post("company", protectCompany, getCompanyData)

// post a job
router.post("/post-job", protectCompany,postJob)

// get applicants data of company
router.post("/applicants", protectCompany, getCompanyJobApplicants)

// get company data
router.post("/list-jobs", protectCompany, getCompanyPostedJobs)

// get company data
router.post("/change-status", protectCompany, changeJobApplicationsStatus)

// get company data
router.post("/change-visibility", protectCompany, changeVisibility)

export default router
