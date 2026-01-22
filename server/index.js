const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './.env' });

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const transactions = require('./routes/transactions');
const auth = require('./routes/auth');

app.use('/api/transactions', transactions);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
