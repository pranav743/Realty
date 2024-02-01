const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/login");
const userController = require("../controllers/userController");
const property = require("../controllers/property");

router.get("/callback", controllerLogin.callbackCheck);
router.get("/login", controllerLogin.handleLoginRequest);
router.get("/logout", controllerLogin.logoutUser);
router.get("/properties/all", property.getAllProperties);
router.get("/images", userController.getPhoto);
router.get("/userProperties", property.getUserProperties);

router.post("/anyuser", controllerLogin.getUserWithAccessToken);
router.post("/register-user", controllerLogin.registerUser);

router.post("/upload", userController.uploadPhoto);
router.post("/find", property.findNearestProperties);
router.post("/mint", property.mintProperty);
router.post("/add-to-wishlist", userController.addToWishList);
router.post("/get-properties-by-ids", property.getPropertiesByIds);
router.post("/get-properties-by-productID", property.getPropertiesByID);




module.exports = router;
