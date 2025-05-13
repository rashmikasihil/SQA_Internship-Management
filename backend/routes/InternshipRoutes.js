import { Router } from "express";
import { addNewCV, assignInterviewToCV, getAllApprovedCVs, getAllCVs, getallinterview, getAllPendingCVs, getAllScheduleCVs, getCVById, getCVStatusByUserId, getpassinterview, updateCV, updateCVStatus, updateInternshipStatus } from "../controllers/cvController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/cv/add:
 *   post:
 *     summary: Add a new CV
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cvFile:
 *                 type: string
 *                 format: binary
 *               additionalFiles:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: CV added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/cv/add", verifyToken, addNewCV);

router.get("/cv/allcv",verifyToken,getAllCVs);

router.put("/cv/update/:id",verifyToken,updateCV);

router.put("/cv/update/:id/status",verifyToken,updateCVStatus);

// get all pending cvs
router.get("/cv/pending",verifyToken,getAllPendingCVs);

// get all approved cvs
router.get("/cv/approved",verifyToken,getAllApprovedCVs);

//get interview assigned cvs
router.get("/cv/interview-assigned",verifyToken,getAllScheduleCVs);


router.get("/cv/interviewpass",verifyToken, getallinterview);

//get cv by id
router.get("/cv/:id",verifyToken,getCVById);

router.put("/cv/update/:id/interviewStatus",verifyToken,updateInternshipStatus);

router.get("/cv/interviewpassed",verifyToken, getpassinterview);


/**
 * @swagger
 * /api/cv/{id}/assign-interview:
 *   put:
 *     summary: Assign an interview to a CV
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: CV ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interviewId:
 *                 type: string
 *                 description: ID of the interview to be assigned
 *     responses:
 *       200:
 *         description: Interview assigned successfully
 *       404:
 *         description: CV not found
 *       500:
 *         description: Internal server error
 */
router.post("/cv/:id/assign-interview", verifyToken, assignInterviewToCV);


// get cv by user id
router.get("/cv/user/:userId",verifyToken,getCVStatusByUserId);


export default router;
