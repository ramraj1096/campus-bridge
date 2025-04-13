import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_MeATaQ4AEW0yFY",
  key_secret: "L1tMJw78snAC0NdW4cq3Qhlr",
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId } = req.body;
    const amount = 70000 * 100;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_order_${userId}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      await User.findByIdAndUpdate(userId, {
        hasPaidFees: true,
      });

      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment" });
  }
};
