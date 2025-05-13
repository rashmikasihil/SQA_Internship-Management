// routes/userRouter.js
import { Router } from "express";
import { registerUser,uploadPDF, loginIntern, loginAdmin, } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js";


const router = Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user with valid credentials and returns a JWT.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */

router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user with valid credentials and returns a JWT.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post("/login-intern", loginIntern);

// Example of a protected route
router.get("/admin-only", verifyToken, verifyRole(["admin"]), (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

router.post("/login-admin",loginAdmin  );
/**
 * @swagger
 * /api/users/upload-pdf:
 *   post:
 *     summary: Upload a PDF file
 *     description: Allows users to upload a PDF file.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: File upload failed
 */
router.post("/upload-pdf", uploadPDF);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);


export default router;
