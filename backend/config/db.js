/*  this code is a reusable module that connects to a MongoDB database using Mongoose, providing error handling and 
    logging for the connection process. It's a common pattern used in Node.js applications to centralize database 
    connection logic. 
*/

const mongoose = require('mongoose'); // import mongoose (1)

const connectDB = async () => {     // This line declares a constant connectDB, which is a function. The function is marked as async, indicating that it will contain asynchronous operations.
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) // This line uses the mongoose library to connect to a MongoDB database. The await keyword is used here because mongoose.connect() is an asynchronous operation, and it allows the code to wait for the connection to be established before moving on. The connection URI is obtained from the environment variable MONGO_URI.

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);    // MongoDB Connected: ${conn.connection.host}.cyan.underline): If the database connection is successful, this line logs a message to the console indicating that the connection has been established. The cyan and underline are likely methods from a library like chalk to add color and formatting to the console output.
    } catch (error) {
        console.log(error);  //  If an error occurs during the database connection attempt, it is logged to the console.
        process.exit(1) // This line exits the Node.js process with an exit code of 1. Exiting with a non-zero code typically indicates that an error occurred, and the 1 here is a conventionally used value for such cases.
    }
}

module.exports = connectDB