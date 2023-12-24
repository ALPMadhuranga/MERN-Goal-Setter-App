/*  this code defines a reusable error handling middleware for a Node.js application. It sets the HTTP status code based 
    on the provided error or a default value, then sends a JSON response containing the error message and stack trace 
    (in non-production environments). 
*/

const errorHandler = (err, req, res, next) => {     // The errorHandler function takes four parameters: err (error), req (request), res (response), and next (next middleware function).
    const statusCode = res.statusCode ? res.statusCode : 500    // It checks if the response object (res) already has a status code. If yes, it uses that status code; otherwise, it defaults to 500 (Internal Server Error).

    res.status(statusCode)  // It sets the HTTP status code of the response to the determined statusCode

    
    res.json({  // It sends a JSON response back to the client. The response includes an object with two properties: 
        message: err.message,   // The error message from the err object.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //  The error stack trace. In a production environment (NODE_ENV === 'production'), the stack trace is set to null to avoid exposing sensitive information.
    })
}

module.exports = {  
    errorHandler    // It exports the errorHandler function, making it available for use in other parts of the application.
}