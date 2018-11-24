const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const UserModel = require('../../Models/AuthModels/UserModel');
var mongoose = require('mongoose');

const salt = 10;
const secret = 'INSPIRON15R';

class AuthController {
    static signUp(req, res) {
        let { email, password } = req.body;
        if (validator.isEmail(email)) {
            let userDocument = new UserModel(req.body);
            console.log('controller :::::::: ', req.body)
            userDocument.password = bcrypt.hashSync(userDocument.password, salt);
            userDocument.save((err, user) => {
                if (!err) {
                    delete user.password;
                    return AuthController.sendResponse(res, user);
                }
                if (err.code == 11000) {
                    let error = {
                        code: err.code,
                        message: err.message
                    }
                    return AuthController.throwError(res, error, 400);
                }
                return AuthController.throwError(res, {message: err.message}, 400);
            })
            // console.log("run till there 1");
            // bcrypt.hash(userDocument.password, salt, (err, hash) => {
            //     console.log("run till there 3");
            //     if (!err) {
            //         userDocument.password = hash;
            //         console.log('userDocument.password: ', userDocument.password)
            //         console.log("userDocument: ", userDocument);
            //         console.log('userDOcument: ', userDocument);
            //     }
            // });
            // console.log("run till there 2");

        } else {
            AuthController.throwError(res, { message: 'Email badly formated' }, 422);
        }
    }

    static signIn(req, res, next) {
        console.log(req.body)
        let { email, password } = req.body;
        if (validator.isEmail(email)) {
            UserModel.findOne({ email }, (err, user) => {
                if (err === null && user === null) {
                    return AuthController.throwError(res, { message: `No user corresponding to the email ${email}` }, 404)
                }
                if (!err) {
                    if (bcrypt.compareSync(password, user.password)) {
                        delete user.password;
                        return AuthController.sendResponse(res, user);
                    } else {
                        return AuthController.throwError(res, { message: `Wrong password` }, 400)
                    }
                } else {
                    return AuthController.throwError(res, { message: `No user corresponding to the email ${email}` }, 404)
                }
            })
        } else {
            return AuthController.throwError(res, { message: 'Email or password badly formated' }, 400);
        }
    }

    static signOut(req, res) {
        return res.json({
            status: 'success'
        })
    }

    static sendResponse(res, user) {
        let userObj = {
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            id: user._id,
            createdAt: user.createdAt
        }
        jwt.sign(userObj, secret, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
            if (!err) {
                return res.json({
                    user: userObj,
                    status: 'success',
                    token
                })
            }
            return this.throwError(res, { message: err.message }, 400);///////////////tesst ans start working on sign in
        })
    }

    static throwError(res, errObj, statusCode = 400) {
        let error = new Error();
        error.code = errObj.code;
        error.message = errObj.message;
        // errObj.status = statusCode;
        error.status = statusCode
        return res.status(statusCode).json({ error })
    }
}

module.exports = AuthController;