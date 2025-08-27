const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


//signup


router.post("sign-up",async(req, res)=>{
const userInDatabase = await User.findOne({ username: req.body.username});
if(userInDatabase){
    return res.send("This username has already been used.")
}
if(req.body.password !== req.body.confirmPassword ){
    return res.send("Your confirmation password doesn’t match the original. Try again")
}

//registering the user
//bcrypt for password encryption//hashing the password so it will be secured
const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

// saving the user data after registering
const user = await  User.create(req.body);
res.send(`Registration successful! Welcome,${user.username}`)
})

// //signin
router.post("sign-in",async(req, res)=>{
    try {    
        const userInDatabase = await User.findOne({ username: req.body.username});
        if(!userInDatabase){
            return res.send("Authentication failed. Please try again later")
        }
        
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
        if(!validPassword){
            return("Invalid username or password. Please try again")
        }
        // login successfully for the user 
        req.session.user = {
            username: userInDatabase,
            _id: userInDatabase
        };
        req.session.message="You have logged in successfully";
    res.redirect("/")
    }catch(err){
    console.log(err);
    req.session.message="try again later";
    }
})




