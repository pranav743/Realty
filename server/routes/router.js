const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/login");

router.get("/callback", controllerLogin.callbackCheck);
router.get("/login", controllerLogin.handleLoginRequest);
router.get("/logout", controllerLogin.logoutUser);


router.post("/anyuser", controllerLogin.getUserWithAccessToken);
router.post("/register-user", controllerLogin.registerUser);


module.exports = router;
