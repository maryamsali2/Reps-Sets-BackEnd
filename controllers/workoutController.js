const  User  = require('../models/User')
const Workout = require('../models/Workouts')


// CREATE METHOD
const createWorkout  =  async (req, res)=>{
    try {
        const {name, day,  description} = req.body
        if (!name || !day  ||  !description){
            return res.status(400).json({status:'error' , msg:'Plese  make sure all fields are are filled in. '})
        } 
        //AFTER PASSING THE VALLIDATION 
const Workout = await Workout.create({
    name,
    day,
    description,
    user: req.userId
})
        res.status(200).json({msg:'All data was recevied successfully'})
    } catch (error) {
        res.status(500).json({status:'error' ,msg:'An unexpected error occurred '})
        
    }
}


module.exports = {
    createWorkout,

}