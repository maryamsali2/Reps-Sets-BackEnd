const mongoose =  require ('mongoose');

const userSchema = new  mongoose.Schema({
    username:{
        type: String,
        minlength:[5,"thats good"],
        maxlength:[12,"This is alot"]
    },
    password:{
        type: String,
        required: true,
        minlength:[6,"Password must be at least 6 characters"],
        maxlength:[14,"Password must not exceed 14 characters"]
    },
},

    {
        timestamps:true
    })

const User = mongoose.model("User", userSchema);
module.exports = User;