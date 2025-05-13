// routes/SchemaRoutes.js

import express from "express";
import { createScheme, deleteScheme, getSchemeById, getSchemes, updateScheme } from "../controllers/schemeController.js"; // Note the lowercase 's' and '.js' extension

const router = express.Router();

// Create a new scheme
router.post("/", createScheme);

router.get("/", getSchemes);
router.get("/:id", getSchemeById);
router.put("/:id", updateScheme);
router.delete("/:id", deleteScheme);

export default router;
