const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect Database
// connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api', require('./routes/api/index'));
app.use('/api/history', require('./routes/api/history'));
app.use('/api/config', require('./routes/api/config'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/tokens', require('./routes/api/tokens'));
app.use('/api/token-pairs', require('./routes/api/tokenPairs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1); // Try next available port
    } else {
      console.error(err);
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

startServer(PORT);
