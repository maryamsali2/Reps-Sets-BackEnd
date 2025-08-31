const router = express.Router();
const workoutController = require('../controllers/workoutController')



//create method route
router.post('/createWorkout', workoutController.createWorkout)




// UPDATE METHOD ROUTE

router.put('/updateWorkout/:id',workoutController.updateWorkout)


module.exports = router