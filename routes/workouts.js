const express = require('express') 
const router = express.Router();
const workoutController = require('../controllers/workoutController')



//create method route
router.post('/createWorkout', workoutController.createWorkout)

// READ METHOD GET ALL WORKOUTS ROUTE
router.get('/getWorkouts',workoutController.getWorkouts)

// GET METHOD GET ONE WORKOUT ROTUE
router.get('/getWorkout/:id',workoutController.getWorkout)


// READ METHOD FOR ALL
router.get('/getWorkouts', workoutController.getWorkouts)





// READ METHOD onlyone
router.get('/getWorkout/:id', workoutController.getWorkout)




// UPDATE METHOD ROUTE

router.put('/updateWorkout/:id',workoutController.updateWorkout)

// DELETE METHOD ROUTE 
router.delete('/deleteWorkout/:id',workoutController.deleteWorkout)


module.exports = router