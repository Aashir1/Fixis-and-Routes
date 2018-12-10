var express = require('express');
var router = express.Router();
var UserUpdateController = require("../Controller/UserUpdateController");
var verifyToken = require("../TokenVerifier/TokenVerifier")

router.put('/busname', verifyToken, (req, res, next) => {
    UserUpdateController.UpdateBusName(req, res, next);
})
router.put("/stoplocation", verifyToken, (req, res, next) => {
    UserUpdateController.updateStopLocation(req, res, next);
})
router.put("/profile", verifyToken, (req, res, next) => {
    UserUpdateController.updateProfile(req, res, next);
})
module.exports = router;