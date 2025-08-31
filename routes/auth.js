
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');

const authController = require("../controllers/authController");
const middleware = require("../middleware")

router.post('/login', authController.Login)
router.post('/register', authController.Register)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
//   controller.CreatePost
)

module.exports = router