import { logger } from '../server.js';

let io;

export const setupSocketIO = (socketIO) => {
    io = socketIO;

    io.on('connection', (socket) => {
        logger.info(`🔌 Client connected: ${socket.id}`);

        // Join room based on user ID
        socket.on('join', (userId) => {
            socket.join(`user:${userId}`);
            logger.info(`User ${userId} joined room`);
        });

        // Join admin room
        socket.on('join:admin', () => {
            socket.join('admin');
            logger.info(`Admin joined: ${socket.id}`);
        });

        // Leave admin room
        socket.on('leave:admin', () => {
            socket.leave('admin');
            logger.info(`Admin left: ${socket.id}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            logger.info(`🔌 Client disconnected: ${socket.id}`);
        });

        // Typing indicator for chat
        socket.on('typing', (data) => {
            socket.broadcast.emit('user:typing', data);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized!');
    }
    return io;
};

// Emit order status update to user
export const emitOrderUpdate = (userId, order) => {
    if (io) {
        io.to(`user:${userId}`).emit('order:update', order);
        logger.info(`Order update emitted for user ${userId}`);
    }
};

// Emit new order to admins
export const emitNewOrder = (order) => {
    if (io) {
        io.to('admin').emit('order:new', order);
        logger.info(`New order emitted to admins`);
    }
};

// Emit reservation update to user
export const emitReservationUpdate = (userId, reservation) => {
    if (io) {
        io.to(`user:${userId}`).emit('reservation:update', reservation);
        logger.info(`Reservation update emitted for user ${userId}`);
    }
};

// Emit new reservation to admins
export const emitNewReservation = (reservation) => {
    if (io) {
        io.to('admin').emit('reservation:new', reservation);
        logger.info(`New reservation emitted to admins`);
    }
};

// Emit new review to admins
export const emitNewReview = (review) => {
    if (io) {
        io.to('admin').emit('review:new', review);
        logger.info(`New review emitted to admins`);
    }
};

// Emit new feedback to admins
export const emitNewFeedback = (feedback) => {
    if (io) {
        io.to('admin').emit('feedback:new', feedback);
        logger.info(`New feedback emitted to admins`);
    }
};

// Emit review response to user
export const emitReviewResponse = (userId, review) => {
    if (io) {
        io.to(`user:${userId}`).emit('review:response', review);
        logger.info(`Review response emitted for user ${userId}`);
    }
};

// Emit notification to user
export const emitNotification = (userId, notification) => {
    if (io) {
        io.to(`user:${userId}`).emit('notification', notification);
        logger.info(`Notification sent to user ${userId}`);
    }
};

// Broadcast system message
export const broadcastMessage = (event, data) => {
    if (io) {
        io.emit(event, data);
        logger.info(`Broadcast: ${event}`);
    }
};
