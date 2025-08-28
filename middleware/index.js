const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// HASHED PASSWORD
const hashedPassword = async (password) => {
let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
return hashedPassword
}



// COMPARE PASSWORDS 
const comparePassword = async(password, storedPassword) =>{
     let passwordMatch = await bcrypt.compare(password, storedPassword)

}









module.exports = {
hashedPassword,
comparePassword,
}