import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import { swaggerUi, swaggerSpec } from './config/swagger.js'; 
import userRoutes from "./routes/userRoutes.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cvrouter from "./routes/InternshipRoutes.js";
import interviewRouter from "./routes/InterviewRoute.js";
import schmasRoute from "./routes/SchemaRoutes.js";
import inductRouter from "./routes/inductionRoutes.js";





config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); 

// Connect to DB  
connectDB();

// Swagger Docs

dotenv.config();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/internships", cvrouter);
app.use("/api/interviews",interviewRouter);
app.use("/api/schemas" ,schmasRoute);
app.use("/api/induct", inductRouter);
// Middleware for file serving

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});