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


// READ METHOD 




// UPDATE METHOD
const updateWorkout = async(req, res)=> {
    
    try {
        // NOT FOUND TO UPDATE
        const workout  = await Workout.findById(req.params.id)
        if(!workout){
            return res.status(404).json({msg: 'Workout not found'})
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






module.exports = {
    createWorkout,
    updateWorkout,

}