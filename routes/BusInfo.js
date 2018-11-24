var express = require('express');
var router = express.Router();
var InfoController = require("../Controller/BusInfoController");
var verifyToken = require("../TokenVerifier/TokenVerifier")

router.get("/:page?", verifyToken, (req, res, next) => {
    InfoController.getInfo(req.query.page, res, next)
})
module.exports = router;