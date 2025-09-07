const  User  = require('../models/User')
const Workout = require('../models/Workouts')


// CREATE METHOD
const createWorkout  =  async (req, res)=>{
    try {
        const {name, day, description   } = req.body

        req.body.user = res.locals.user.id
        if (!name || !day  ||  !description){
            return res.status(400).json({status:'error' , msg:'Plese  make sure all fields are are filled in. '})
        } 

        //AFTER PASSING THE VALLIDATION 
        const workout = await Workout.create(
req.body)
        // res.status(200).json({msg:'All data was recevied successfully'})
        res.send(workout)
    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error' ,msg:'An unexpected error occurred '})
        
    }
}

// READ METHOD 


// get workouts 
const getWorkouts = async (req, res)=> {
    try {
        const workouts = await Workout.find({user: res.locals.user.id}).sort({createdAt:-1})
        res.status(200).json(workouts)
    } catch (error) {
        console.log(err)
        res.status(500).json({status:'error' ,msg:'An unexpected error occurred '})
    }
}


// get workout
const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        if (!workout){
            return res.status(400).json({msg:'workout not found'})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ status: 'error', msg: error.message })
}
}



// UPDATE METHOD
const updateWorkout = async(req, res)=> {
    try {
        // NOT FOUND TO UPDATE
        const workout  = await Workout.findById(req.params.id)
        if(!workout){
            return res.status(404).json({msg: 'Workout not found'})
        }
        if(!workout.user.equals(res.locals.user.id)) {
            return res.status(401).json({msg: "Unauthorized Access!"})
        }
        const updated = await Workout.findByIdAndUpdate(
            req.params.id, //search for the workout that want to be edited
            req.body, //change it with the new informations
            {new:true} //true because there is something changed
        )
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({status:'error',msg:'not found'})
    }
}






// DELETE METHOD
const deleteWorkout = async (req, res)=>{
    try {
        const workout = await Workout.findById(req.params.id)
        if(!workout){
            return res.status(404).json({msg:'Workout not found'})
        }
        if(!workout.user.equals(res.locals.user.id)) {
            return res.status(401).json({msg: "Unauthorized Access!"})
        }
        const deleted = await Workout.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:'Workout deleted successfully'})
    } catch (error) {
        res.status(500).json({status:'error',msg:'not found'})
    }
}

// EXERCISES CONTROLLERS


// CREATE AN EXERCISE
const createExercise = async (req ,res ) => {
    try {
        const workout = await Workout.findById(req.params.id)
        if(!workout){
             return res.status(404).json({msg:'workout not found'})
        }
        if(!workout.user.equals(res.locals.user.id)) {
            return res.status(401).json({msg: "Unauthorized Access!"})
        }
        const {name , weight, SetsAndReps } = req.body
        workout.exercises.push({name, weight, SetsAndReps})
        await workout.save()
        res.status(201).json(workout)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


// Update exercise
const updateExercise = async (req, res) => {
    try {
        const {id ,exerciseId} = req.params
        const {name, weight, SetsAndReps} = req.body
        
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({msg:'workout not found'})
        }
        if(!workout.user.equals(res.locals.user.id)) {
            return res.status(401).json({msg: "Unauthorized Access!"})
        }
        // searching for the exercise in the workouts
        const exercise = workout.exercises.id(exerciseId)
        if(!exercise){
             return res.status(404).json({msg:'exercise not found'})
        }
        if(name){
            exercise.name = name
        }
        if(weight){
            exercise.weight = weight
        }
        if(SetsAndReps){
            exercise.SetsAndReps = [...exercise.SetsAndReps, ...SetsAndReps]
        }
        await workout.save()
         res.status(200).json(exercise)


    } catch (error) {
            res.status(500).json({ msg: error.message });

        
    }
}


// DELETE EXERCISE 
const deleteExercise = async (req, res) =>{
    try {
        console.log("here")
        const {id ,exerciseId} = req.params
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({msg:'workout not found'})
        }
        if(!workout.user.equals(res.locals.user.id)) {
            return res.status(401).json({msg: "Unauthorized Access!"})
        }
        const exercise = workout.exercises.id(exerciseId)
        if(!exercise){
             return res.status(404).json({msg:'exercise not found'})
        }
        // removing the exerxise
        exercise.deleteOne()
        // saving after the removes
        await workout.save()
        
        return res.status(200).json({ msg: 'Exercise deleted successfully' })
        } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}











module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    // EXERCICES
    createExercise,
    updateExercise,
    deleteExercise,
}