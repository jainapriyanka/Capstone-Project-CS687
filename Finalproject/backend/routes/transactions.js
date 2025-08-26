const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Add a transaction
router.post('/', async (req, res) => {
  try {
    const { title, amount, date, type, category, reference } = req.body;

    const newTransaction = new Transaction({ title, amount, date, type, category, reference });
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction saved', data: newTransaction });
  } catch (err) {
    console.error('Error saving transaction:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get transactions by type (income/expense)
router.get('/', async (req, res) => {
  try {
    const type = req.query.type;
    const transactions = await Transaction.find(type ? { type } : {});
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
