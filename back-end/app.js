const express = require('express');
const app = express();
const logger = require('morgan');
const router = require('./routes');
const cors = require('cors');

// Json Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(logger('dev'));

// Cors
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    credentials: true,
  };
app.use(cors(corsOptions));
//Config to front end

// Routes
app.use('/api/v1', router);

// Catch 404 Errors and forward them to handle
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = process.env.DEV === 'development' ? err : {};
    const status = err.status || 500;

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
