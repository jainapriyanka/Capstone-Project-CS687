const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { auth } = require('../middleware/auth'); // import auth middleware

// Add a transaction
router.post('/', auth, async (req, res) => {
  try {
    const { title, amount, date, type, category, reference } = req.body;

    const newTransaction = new Transaction({
      userId: req.user.id, // associate transaction with logged-in user
      title,
      amount,
      date,
      type,
      category,
      reference
    });
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction saved', data: newTransaction });
  } catch (err) {
    console.error('Error saving transaction:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get transactions by type (income/expense)
router.get('/', auth, async (req, res) => {
  try {
    const type = req.query.type;
    const query = { userId: req.user.id }; // filter by logged-in user
    if (type) query.type = type;

    const transactions = await Transaction.find(query);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
