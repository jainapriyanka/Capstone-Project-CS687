const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true }, // 👈 Added category
  reference: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);
