const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

const contactRoutes = require('./routes/contactRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabling for local development ease with inline styles/scripts if any
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder for frontend
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/data', dataRoutes);

// Serve the index.html for any unknown routes (SPA like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
