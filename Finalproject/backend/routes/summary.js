const express = require("express");
const Transaction = require("../models/Transaction");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    console.log("User ID:", req.user.id); // debug
    const userId = req.user.id;
    console.log("Fetching summary for user:", userId);

    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions
      .filter(tx => tx.type === "income")
      .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpense = transactions
      .filter(tx => tx.type === "expense")
      .reduce((acc, tx) => acc + tx.amount, 0);

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      transactions
    });
  } catch (err) {
    console.error("Summary route error:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
