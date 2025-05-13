import { Router } from "express";
const router = Router();
import { getAllInductions, createInduction, deleteInduction } from "../controllers/inductionController.js";

router.get("/", getAllInductions);
router.post("/", createInduction);
router.delete("/:id", deleteInduction);

export default router;