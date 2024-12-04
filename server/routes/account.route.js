import express from "express";
import authMiddleware from "../middleware.js";
import {
  getBalance,
  transferAmount,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferAmount);

export default router;
