var express = require('express');
var router = express.Router();
var RouteController = require("../Controller/BusesRoutesController");
var verifyToken = require("../TokenVerifier/TokenVerifier");

router.get("/", verifyToken, (req, res, next) => {
    RouteController.getBusesRoutes(res, next);
});

module.exports = router; 