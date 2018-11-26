var express = require('express');
var router = express.Router();
var RouteController = require("../Controller/BusRouteController");
var throwError = require("../ErrorHandler/Error");
var verifyToken = require("../TokenVerifier/TokenVerifier");

router.get("/:busname", verifyToken, (req, res, next) => {
    RouteController.getRoute(req.params.busname, res, next);
})





module.exports = router; 