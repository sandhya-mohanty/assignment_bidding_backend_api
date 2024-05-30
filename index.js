const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const bidRoutes = require('./routes/bidRoutes');
const itemRoutes = require('./routes/itemRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});
