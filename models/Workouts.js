const mongoose =  require ('mongoose');

const WorkoutsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    day: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },

    
    // connecting it with the userSchema
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Adding the excercises schema 
    exercises: [
      {
        name: { type: String, required: true },
        weight: { type: Number },
        SetsAndReps: [
          {
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", WorkoutsSchema);
module.exports = Workout;
