var express = require('express');
var router = express.Router();
var InfoController = require("../Controller/BusInfoController");
var verifyToken = require("../TokenVerifier/TokenVerifier")

router.get("/all", verifyToken, (req, res, next) => {
    InfoController.getAllInfo(res, next);
})
router.get("/:page?", verifyToken, (req, res, next) => {
    InfoController.getInfoByPage(req.query.page, res, next);
})
module.exports = router;