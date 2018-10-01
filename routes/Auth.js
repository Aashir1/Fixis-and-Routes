var express = require('express');
var router = express.Router();
var AuthModel = require("../Model/AuthModel");

router.post("/signUp", (req, res) => {
    AuthModel.signUpUser(req.body, res)
})
module.exports = router