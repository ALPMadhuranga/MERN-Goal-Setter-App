const express = require('express');     // import express (1)
const dotenv = require('dotenv').config();       // import dotenv (2)
const colors = require('colors'); // import colors (11)
const {errorHandler} = require('./middleware/errorMiddleware'); // import errorHandler middleware (9)
const connectDB = require('./config/db') // import db.js file (12)
const port = process.env.PORT || 5000;  // (4) this line of code is saying: "Use the PORT value from the environment variables if it's set; otherwise, use the default value 5000." This is often used in web development to allow the server to use a specified port if one is provided or a default port if not.

connectDB();   // run the connectDB() function (13)

const app = express();  // (3) This line of code creates a constant variable named app and assigns it the value of a new instance of the Express application. This app variable can then be used to configure and define routes for your web application when building with Express.js.

app.use(express.json());    // (7) This line is essentially setting up your Express application to automatically parse JSON data in incoming requests and make it accessible in the request.body object. 
app.use(express.urlencoded({ extended: false }));   // (8)  this line of code is telling Express to use middleware that can handle form data submitted via HTML forms. The { extended: false } option is a configuration setting for how to parse this data, and setting it to false means that the parsing library won't parse nested objects.


app.use('/api/goals', require('./routes/goalRoutes'));  // (6) goalRoutes use & require 
app.use('/api/users', require('./routes/userRoutes')); // (11) userRoutes use & require

app.use(errorHandler); // use created error Handler (10)

app.listen(port, () => console.log(`Server started on port ${port}`)); // (5) when you run your Node.js application and this line is executed, it means your server is up and running, ready to handle incoming requests on the specified port, and you'll see a message in the console indicating that the server has started.