const express = require('express');     // import express (1)
const router = express.Router();        // express.Router() method assign to variable (2)
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalControler'); // import controllers inside goalControler.js (3)

const {protect} = require('../middleware/authMiddleware')


/* CRUD Routes & call its controllers */
router.get('/', protect, getGoals); // create get request and call getGoals funtion (3.1)

router.post('/', protect, createGoal); // create post request and call createGoal funtion (3.2)

router.put('/:id', protect, updateGoal); // create put request and call updateGoal funtion (3.3)

router.delete('/:id', protect, deleteGoal); // create delete request and call deleteGoal funtion (3.4)

/* These routes create like below using same routes */
// router.route('/').get(protect, getGoals).post(createGoal);
// router.route('/:id').put(updateGoal).delete(deleteGoal);


module.exports = router;    // export router