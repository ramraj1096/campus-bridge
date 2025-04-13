import express from "express";
import {
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/FeesController.js";

const router = express.Router();

router.post("/create-order", paymentRazorpay);
router.post("/verify-payment", verifyRazorpay);

export default router;
