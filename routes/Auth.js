var express = require('express');
var router = express.Router();
var AuthModel = require("../Model/AuthModel");

router.post("/signUp", (req, res, next) => {
    AuthModel.signUpUser(req.body, res, next)
})
router.post("/signIn", (req, res, next) => {
    if (req.body.email && req.body.pass) {
        AuthModel.signInUser(req.body, res, next)
        
    } else {
        if (!req.body.email && !req.body.pass) {
            let err = new Error();
            err.message = "email and password is required";
            err.status = 400;
            next(err);
        }
        else if (!req.body.email) {
            let err = new Error();
            err.message = "email is required";
            err.status = 400;
            next(err);
        } else {
            let err = new Error();
            err.message = "password is required";
            err.status = 400;
            next(err);
        }
    }
})
module.exports = router