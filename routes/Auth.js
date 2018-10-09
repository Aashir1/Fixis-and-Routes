let express = require('express');
let router = express.Router();
let AuthController = require('../Controller/AuthController/AuthController');

router.post('/signup', (req, res, next) => {
    let { body } = req;
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.name) {
        createError(body, res);
    } else {
        AuthController.signUp(req, res);
    }
});


router.post('/signIn', (req, res, next) => {
    let { body } = req;
    if (!body.email || !body.password) {
        createError(body, res);
    } else {
        AuthController.signIn(req, res);
    }
})


function createError(obj, res) {
    let err = new Error();
    for (let i in obj) {
        if (!obj[i].toString().trim()) {
            console.log(`${i} is required`);
            err.message = `${i} is required`;
            err.status = 400;
            break;
        }
    }
    res.json(err);
}


module.exports = router;