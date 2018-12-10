let express = require('express');
let router = express.Router();
let ChangePasswordController = require('../Controller/ChangePasswordController');
let verifyToken = require('../TokenVerifier/TokenVerifier');

router.post('/changepassword', (req, res, next) => {
    console.log("change password");
    ChangePasswordController.changePassword(req, res, next);
})

module.exports = router;