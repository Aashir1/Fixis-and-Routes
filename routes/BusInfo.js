var express = require('express');
var router = express.Router();
var InfoController = require("../Controller/BusInfoController");
var verifyToken = require("../TokenVerifier/TokenVerifier")

router.get("/all", verifyToken, (req, res, next) => {
    InfoController.getAllInfo(res, next);
})
router.get("/:page?", verifyToken, (req, res, next) => {
    InfoController.getInfo(req.query.page, res, next)
});


router.post('/add', verifyToken, (req, res, next) => {
    InfoController.addInfo(req, res, next);
});

router.post('/delete/:id', verifyToken, (req, res, next) => {
    InfoController.deleteInfo(req, res, next);
})
router.post('/update', verifyToken, (req, res, next) => {
    console.log("update bus info: ", req.body);
    InfoController.updateInfo(req, res, next);
})
module.exports = router;