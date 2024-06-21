const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

// Initialize MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(express.json());

  // Import routes
  const authRoutes = require('./backend/routes/auth');
  
  // Use routes
  server.use('/api/auth', authRoutes);

  // Handle Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// "dev": "node server.js",
// "build": "next build",
// "start": "next start",
// "lint": "next lint"