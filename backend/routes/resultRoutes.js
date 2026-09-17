import express from "express";
import authMiddleware from "../middleware/auth.js";

const resultRouter = express.Router();

resultRouter.post("/", authMiddleware, createResult);
resultRouter.get("/", authMiddleware, listResults);

export default resultRouter;
