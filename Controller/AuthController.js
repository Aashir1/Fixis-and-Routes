var User = require('../Model/AuthModel');
var createError = require('http-errors');
var bcrypt = require('bcrypt');
var saltRounds = 10;
const jwt = require("jsonwebtoken");
var validator = require('validator');
const key = "fixs-and-routes";
var throwError = require("../ErrorHandler/Error");
class UserClass {
    static signUpUser(obj, res, next) {
        if (obj.email && obj.name && obj.pass) {
            if (!validator.isEmail(obj.email)) {
                throwError("email address not properly formed", 400, next);
            }
            let user = new User({ name: obj.name, email: obj.email, pass: obj.pass });

            const validationResult = user.validateSync(["pass", "name", "email",])

            if (validationResult) {
                // console.log("validationResult.errors", validationResult.errors)

                const messageArray = Object.keys(validationResult.errors).map(i => validationResult.errors[i]["message"])

                throwError(messageArray, 422, next)

            }
            bcrypt.hash(obj.pass, saltRounds, (err, hash) => {

                let user = new User({ name: obj.name, email: obj.email, pass: hash });


                ResolvePromise(user.save(), res, next)
            })
        } else {
            if (!obj.email && !obj.pass && !obj.name) {
                throwError("name, email and password is required", 400, next)
            }
            else if (!obj.email) {
                throwError("email is required", 400, next)
            } else if (!obj.name) {
                throwError("name is required", 400, next)
            }
            else {
                throwError("password is required", 400, next);
            }
        }



    }
    static signInUser(obj, res, next) {
        if (obj.email && obj.pass) {
            if (!validator.isEmail(obj.email)) {
                throwError("email address not properly formed", 400, next);
            }
            User.find({ email: obj.email }).then(value => {

                bcrypt.compare(obj.pass, value[0] && value[0].pass, (err, bcryptRes) => {
                    if (bcryptRes) {

                        let user = value[0];

                        jwt.sign({ name: value[0].name, email: value[0].email }, key, (err, token) => {
                            if (!err)
                                res.json({
                                    status: "success",
                                    token,
                                    user: { name: value[0].name, email: value[0].email, _id: value[0]._id }
                                });
                            else
                                throw err
                        });
                    } else {
                        throwError("invalid email or password", 400, next)
                    }
                })
            }).catch(err => {
                console.log("email find catch", err)
            })
        } else {
            if (!obj.email && !obj.pass) {
                throwError("email and password is required", 400, next)
            }
            else if (!obj.email) {
                throwError("email is required", 400, next);
            } else {
                throwError("password is required", 400, next);
            }
        }

    }
}


function ResolvePromise(dbOperator, res, next) {
    dbOperator.then(value => {

        let user = { ...value._doc };
        delete user.pass;

        jwt.sign(user, key, (err, token) => {


            if (!err)
                res.json({
                    status: "success",
                    token,
                    user
                });
            else
                throw err
        });

    }).catch(err => {
        console.log("in catch", err);
        if (11000 === err.code) {
            var MongooseError = require('mongoose/lib/error')
            var valError = new MongooseError.ValidationError(err)
            // valError.errors["message"] = new MongooseError.ValidatorError('message', 'Duplicate found', err.err)
            valError["message"] = "name or email already taken";
            valError["status"] = 409;
            err = valError
            console.log("valError", valError)

            throwError(err.message, err.status, next)
        }



    })
}
module.exports = UserClass;