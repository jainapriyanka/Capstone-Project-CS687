// routes/chat.js
const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");
const { auth } = require("../middleware/auth"); // matches export

const router = express.Router();

router.post("/", auth, async (req, res) => {
  console.log("Body received:", req.body);
  console.log("Auth header:", req.headers.authorization);
  const userId = req.user.id;
  const message = req.body.content; // frontend sends { message: "..." }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // 1. Fetch all user transactions
    const transactions = await Transaction.find({ userId }).lean();

    if (!transactions.length) {
      return res.json({ response: "You have no transactions yet." });
    }

    // 2. Format into plain text
    const context = transactions
      .map(
        (t) =>
          `${new Date(t.date).toISOString().split("T")[0]} | ${t.type} | ${
            t.title
          } | $${t.amount} | ${t.category}`
      )
      .join("\n");

    // 3. Build Ollama prompt
    const prompt = `
You are a financial assistant.
Here are the user's transactions:

${context}

User's question: ${message}

Answer only using the data above.
If the user asks for totals or averages, calculate from the list.
If they ask for tips, give advice based on the spending patterns.
    `;

    // 4. Call Ollama server (non-streaming)
    const ollamaRes = await axios.post(
      "https://friendly-couscous-7v9qpxqwx99gfp5vw-11434.app.github.dev/api/generate",
      {
        model: "gemma2:2b",
        prompt,
      }
    );

    const lines = ollamaRes.data.trim().split("\n");

    let finalResponse = "";

    for (const line of lines) {
    try {
        const obj = JSON.parse(line);
        if (obj.response) finalResponse += obj.response;
    } catch (e) {
        console.error("Failed to parse line:", line);
    }
    }

    console.log("Response:", finalResponse);

    res.json({ response: finalResponse });
  } catch (err) {
    console.error("Chat error:", err.response?.data || err.message);
    res.status(500).json({ error: "Chat failed" });
  }
});

module.exports = router;
