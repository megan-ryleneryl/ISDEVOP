const mongoose = require('mongoose');
const app = require('./app');

/* Connect to MongoDB and then Listen for Requests */
/**
 * admin is the username
 * 12345 is the password
 * itisdev-mvp is the database name
 */
const dbURI = 'mongodb+srv://admin:12345@itisdev-mvp.jary1la.mongodb.net/itisdev-mvp';

// Connect to MongoDB and start the server
mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to MongoDB Atlas itisdev-mvp database.");

        // Configure sessions now that DB is connected
        // configureSession(app, dbURI); // Make sure this is before any Passport usage

        // Start the server
        app.listen(3000, () => {
            console.log("Server is running on port 3000.");
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
