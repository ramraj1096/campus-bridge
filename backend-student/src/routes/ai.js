import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/ask-ai", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyChuVVGIyvriqpOTJBi-zFB-TwNbuPQAf4`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }
    );
    console.log(response);
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";
    console.log(reply);
    res.json({ success: true, reply });
  } catch (error) {
    console.error("AI Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "AI request failed",
      error: error?.response?.data,
    });
  }
});

export default router;
