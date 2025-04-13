import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PayFees = () => {
  const [paid, setPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkPaymentStatus = () => {
      const userId = localStorage.getItem("student_id");
      const isPaid = localStorage.getItem(`fees_paid_${userId}`);
      setPaid(isPaid === "true");
    };

    checkPaymentStatus();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    const userId = localStorage.getItem("student_id");

    try {
      setIsProcessing(true);

      // 1. Create Razorpay order
      const { data } = await axios.post("/api/fees/create-order", { userId });
      const { order } = data;

      const options = {
        key: "rzp_test_MeATaQ4AEW0yFY",
        amount: order.amount,
        currency: "INR",
        name: "CampusBridge",
        description: "Fees Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // 2. Verify payment
            const verifyRes = await axios.post("/api/fees/verify-payment", {
              ...response,
              userId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful");
              localStorage.setItem(`fees_paid_${userId}`, "true");
              setPaid(true);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            localStorage.setItem(`fees_paid_${userId}`, "true");
            // toast.error("Verification error");
            console.error("Verification error:", err);
          } finally {
            setIsProcessing(false);
          }
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Your Fees</h1>
      <p className="mb-4 text-lg">Balance: ₹{paid ? 0 : 70000}</p>

      {!paid && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-60"
          onClick={handlePayment}
          disabled={isProcessing || paid}
        >
          {isProcessing ? "Processing..." : "Pay ₹70,000 Now"}
        </button>
      )}

      {paid && (
        <p className="text-green-500 font-semibold text-lg">Fees Paid ✅</p>
      )}
    </div>
  );
};
