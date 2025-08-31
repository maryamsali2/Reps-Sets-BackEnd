const  User  = require('../models/User')

const middleware = require('../middleware')

//Register

     
const Register = async (req, res) => {
  try {
    const { password, username } = req.body
    
    let passwordDigest = await middleware.hashPassword(password)
    
    let existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      let user = await User.create({ username, password: passwordDigest })
      user = { username: user.username, _id: user._id, createdAt: user.createdAt, updatedAt: user.updatedAt, __v: user.__v }
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

// //login
const Login = async (req, res) => {
  try {
    
    const { username, password } = req.body
    
    const user = await User.findOne({ username })
    let matched = await middleware.comparePassword(
      password,
      user.password
    )
    
    if (matched) {
      let payload = {
        id: user._id,
        username: user.username
      }
      
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}


module.exports = {
    Register,
    Login,
}