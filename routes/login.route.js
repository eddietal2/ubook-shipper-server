const express = require("express");
const router = express.Router();
const loginController  = require('../controllers/login-controller');

router.post('/', loginController.login);
router.post('/forgot-password', loginController.forgotPassword);

// router.get('/', loginController.loginGoogle);
// router.get('/', loginController.loginFacebook);
// router.get('/', loginController.loginApple);

module.exports = router;