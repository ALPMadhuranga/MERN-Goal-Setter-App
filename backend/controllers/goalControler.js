const asyncHandler = require('express-async-handler'); // (5) import express-async-handler // express-async-handler is a middleware for Express.js, a popular web framework for Node.js. This middleware simplifies error handling in asynchronous route handlers by allowing you to write asynchronous code without explicitly handling promise rejections.
const goalModel = require('../models/goalModel') // (6) import goal moddel
const userModel = require('../models/userModel')


// @description Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {    // create function 'getGoals' (1)
    const goals = await goalModel.find({ user: req.user.id })

    res.status(200).json(goals);   // send status respond to frontend as a json format (1.1)
})

// @description Create Goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {  // create function 'createGoal' (2)
    if(!req.body.text) { // The code checks if the text property in the req.body object is falsy. (2.3)
        res.status(400)
        throw new Error('Please add a text field'); // (2.4) this code is used to handle a situation where a client has made a request to the server without including a required "text field." The server responds with a 400 Bad Request status and sends an error message to indicate that a text field must be included in the request.
    }

    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id,
    })
    
    res.status(200).json(goal);   // send status respond to frontend as a json format (2.1)
})

// @description Update Goal
// @route UPDATE /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {  // create function 'updateGoal' (3)
    const goal = await goalModel.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await userModel.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal);   // send status respond to frontend as a json format (3.1)
})

// @description Delete Goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {  // create function 'deleteGoal' (4)

    const { id } = req.params;

    const goal = await goalModel.findById(id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await userModel.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goalModel.findByIdAndDelete(id)

    res.status(200).json({ id });   // send status respond to frontend as a json format (4.1)
})

module.exports = {
    getGoals,       // export getGoals function (1.2)
    createGoal,        // export createGoal function (2.2)
    updateGoal,        // export updateGoal function (3.2)
    deleteGoal        // export updateGoal function (4.2)
}