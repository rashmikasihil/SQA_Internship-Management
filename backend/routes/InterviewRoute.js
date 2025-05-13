import express from "express";
import {
  createInterview,
  assignInterns,
  getInterviews,
  getInterviewById,
  deleteInterview,
 
  
  
} from "../controllers/InterviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Interview routes
router.post("/create",verifyToken,createInterview);
router.post("/assign", assignInterns);
router.get("/",verifyToken ,getInterviews);
router.get("/:interviewID", verifyToken,getInterviewById);
router.delete("/:interviewID", deleteInterview);
router.get("/all", getInterviews);

export default router;
