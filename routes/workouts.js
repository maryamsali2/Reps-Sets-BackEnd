const express = require('express') 
const router = express.Router();
const workoutController = require('../controllers/workoutController')
const middleware = require('../middleware/index')

//create method route
router.post('/', middleware.stripToken, middleware.verifyToken, workoutController.createWorkout)

// READ METHOD FOR ALL
router.get('/', middleware.stripToken, middleware.verifyToken, workoutController.getWorkouts)

// READ METHOD onlyone
router.get('/:id', middleware.stripToken, middleware.verifyToken, workoutController.getWorkout)

// UPDATE METHOD ROUTE
router.put('/:id', middleware.stripToken, middleware.verifyToken, workoutController.updateWorkout)

// DELETE METHOD ROUTE 
router.delete('/:id', middleware.stripToken, middleware.verifyToken, workoutController.deleteWorkout)


// Exercises Routes

// Create Exercises
router.post('/:id/exercises', middleware.stripToken, middleware.verifyToken, workoutController.createExercise)

// Update Exercises 
router.put('/:id/exercises/:exerciseId', middleware.stripToken, middleware.verifyToken, workoutController.updateExercise)

// Delete Exercises
router.delete('/:id/exercises/:exerciseId', middleware.stripToken, middleware.verifyToken, workoutController.deleteExercise)

module.exports = router