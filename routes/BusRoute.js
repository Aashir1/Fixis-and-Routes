var express = require('express');
var router = express.Router();
var RouteController = require("../Controller/BusRouteController");
const jwt = require("jsonwebtoken");
const key = "fixs-and-routes";

router.get("/:busname?", verifyToken, (req, res, next) => {
    RouteController.getRoute(req.query.busname, res, next)
})










function verifyToken(req, res, next) {
    // Get auth header value
    // console.log("headers", req.headers)
    const bearerHeader = req.headers['authorization'];
    // console.log("token", bearerHeader)
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;


        jwt.verify(req.token, key, (err, decoded) => {
            if (err) {
                throwError("unauthorize request", 401, next);
            }
            else {
                // Next middleware
                next();
            }
        })

    } else {
        // Forbidden
        throwError("forbidden", 403, next);
    }
}
function throwError(message, status, next) {
    let err = new Error();
    err.status = status;
    err.message = message;
    next(err);
}
module.exports = router; 