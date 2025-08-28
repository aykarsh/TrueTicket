require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { stacksMiddleware } = require('./middleware/stacks');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(stacksMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/tickets', ticketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});
