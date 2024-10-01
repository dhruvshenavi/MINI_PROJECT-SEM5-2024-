const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// CORS configuration to allow requests from your frontend's URL
const corsOptions = {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501'], // Add all the origins from where requests will be made
  credentials: true,  // Allows session cookies to be passed with the requests
};

app.use(cors(corsOptions));


app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/deposits', require('./routes/depositRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
