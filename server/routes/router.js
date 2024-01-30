const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/login");
const userController = require("../controllers/userController");

router.get("/callback", controllerLogin.callbackCheck);
router.get("/login", controllerLogin.handleLoginRequest);
router.get("/logout", controllerLogin.logoutUser);

router.post("/anyuser", controllerLogin.getUserWithAccessToken);
router.post("/register-user", controllerLogin.registerUser);

router.post("/upload", userController.uploadPhoto);
router.get("/images", userController.getPhoto);

module.exports = router;
