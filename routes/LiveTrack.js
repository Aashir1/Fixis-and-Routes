var express = require('express');
var router = express.Router();
var LiveTrackController = require("../Controller/LiveTrackController");
var throwError = require("../ErrorHandler/Error");
var verifyToken = require("../TokenVerifier/TokenVerifier")

router.get("/", verifyToken, (req, res, next) => {
    LiveTrackController.getCurrLocation(req, res, next);
})





module.exports = router; 