var express = require('express');
var router = express.Router();
var AuthController = require("../Controller/AuthController");

router.post("/signUp", (req, res, next) => {
    AuthController.signUpUser(req.body, res, next)
})
router.post("/signIn", (req, res, next) => {
    AuthController.signInUser(req.body, res, next)
})

module.exports = router