const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const UserModel = require('../../Models/AuthModels/UserModel');
const salt = 20;
var mongoose = require('mongoose');
const secret = 'INSPIRON15R';
// var mongodbUrl = 'mongodb://<name>:<password>@ds125381.mlab.com:25381/server';
var mongodbUrl = 'mongodb://localhost:27017/fixis'
mongoose.connect(mongodbUrl)
mongoose.connection
    .once('open', () => {
        console.log('connection is establised: ');
    }).on('error', () => {
        console.log('error occured');
    });


class AuthController {
    static signUp(req, res) {
        let { email, password } = req.body;
        if (validator.isEmail(req.body.email)) {
            let userDocument = new UserModel(req.body);
            userDocument.password = bcrypt.hashSync(userDocument.password, salt)
            userDocument.save((err, user) => {
                if (!err) {
                    delete user.password;
                    return sendResponse(res, user);
                }
                return this.throwError(res, err.message, 400);
            })
        } else {
            throwError(res, 'Email badly formated', 422);
        }

    }

    sendResponse(res, user) {
        jwt.sign(user, secret, (err, token) => {
            if (!err) {
                return res.json({
                    user,
                    status: 'success',
                    token
                })
            }
            return this.throwError(res, err.message, 400);///////////////tesst ans start working on sign in
        })
    }

    throwError(res, message, statusCode = undefined) {
        if (statusCode) {
            return res.status(statusCode).json({ message })
        }
        return res.json(message);

    }
}

module.exports = AuthController;