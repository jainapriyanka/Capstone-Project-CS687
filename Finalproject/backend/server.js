const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');   // 👈 NEW
const summaryRoutes = require('./routes/summary');   // 👈 NEW
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);              // 👈 NEW
app.use('/api/dashboard', summaryRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
