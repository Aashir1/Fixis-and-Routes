var express = require('express');
var router = express.Router();
var RouteController = require("../Controller/BusRouteController");
var throwError = require("../ErrorHandler/Error");
var verifyToken = require("../TokenVerifier/TokenVerifier");

router.get("/:busname", verifyToken, (req, res, next) => {
    console.log('comming till there: ', req.params.busname);
    RouteController.getRoute(req.params.busname, res, next);
})

router.post('/add', verifyToken, (req, res, next) => {
    console.log('at add bus route');
    RouteController.addRoute(req, res, next);
})

router.post('/update', verifyToken, (req, res, next) => {
    console.log('at update bus route', req.body);
    RouteController.updateRoute(req, res, next);
})

router.post('/delete/:id', verifyToken, (req, res, next) => {
    console.log("bus route controller");
    RouteController.deleteRoute(req, res, next);
})



module.exports = router; 