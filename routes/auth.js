const express =  require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const middleware = require("../middleware/index")

router.post('/login', authController.Login)
router.post('/register', authController.Register)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
//   controller.CreatePost
)

module.exports = router