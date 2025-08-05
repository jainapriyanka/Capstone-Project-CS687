const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Add a transaction
router.post('/', async (req, res) => {
  try {
    const { title, amount, date, type, reference } = req.body;

    const newTransaction = new Transaction({ title, amount, date, type, reference });
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction saved', data: newTransaction });
  } catch (err) {
    console.error('Error saving transaction:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
