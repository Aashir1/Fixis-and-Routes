var db = require('../dbConnection');
const Schema = db.Schema;
const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        unique: [true, "name already taken"],
        required: [true, "name is required"],
        validate: {
            validator: (name) => name.length >= 3,
            message: 'Name must be longer than 3 characters'
        }
    },
    email: {
        type: Schema.Types.String,
        required: [true, "email must be required"],
        unique: [true, "email already taken"],
        validate: {
            validator: (email) => email.length >= 10,
            message: 'email must be longer than 10 characters'
        }
    },
    pass: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (pass) => pass.length >= 8,
            message: 'password must be longer than 8 characters'
        }
    }

});
const User = db.model("user", UserSchema);
var createError = require('http-errors');
var bcrypt = require('bcrypt');
var saltRounds = 10;
const jwt = require("jsonwebtoken");
const key = "fixs-and-routes";
class UserClass {
    static signUpUser(obj, res, next) {
        console.log(obj)
        // let error = new Error("this is error")
        // error.status = 405;
        // throw error
        // throwError()
        let user = new User({ name: obj.name, email: obj.email, pass: obj.pass });
        // console.log("here")
        const validationResult = user.validateSync(["pass", "name", "email",])
        // user.validate(validationResult => {

        console.log("va lidationResult", validationResult)
        // })
        if (validationResult) {
            console.log("validationResult.errors", validationResult.errors)

            const messageArray = Object.keys(validationResult.errors).map(i => validationResult.errors[i]["message"])

            throwError(messageArray, 422, next)
            // let errorObj = new Error()
            // errorObj.message = messageArray;
            // next(errorObj)
        }
        bcrypt.hash(obj.pass, saltRounds, (err, hash) => {

            let user = new User({ name: obj.name, email: obj.email, pass: hash });


            ResolvePromise(user.save(), res, next)
        })
    }
    static signInUser(obj, res, next) {
        User.find({ email: obj.email }).then(value => {
            
            bcrypt.compare(obj.pass, value[0] && value[0].pass, (err, bcryptRes) => {
                if (bcryptRes) {

                    let user = value[0];

                    jwt.sign({ name: value[0].name, email: value[0].email }, key, (err, token) => {
                        if (!err)
                            res.json({
                                status: "success",
                                token,
                                user: { name: value[0].name, email: value[0].email }
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
    }
}
function ResolvePromise(dbOperator, res, next) {
    dbOperator.then(value => {

        let user = { ...value._doc };
        delete user.pass;
        console.log("user:::: before jwt", user)
        jwt.sign(user, key, (err, token) => {
            console.log("user:::: after jwt", user)

            if (!err)
                res.json({
                    status: "success",
                    token,
                    user
                });
            else
                throw err
        });
        // res.json(value)
    }).catch(err => {
        console.log("in catch", err);
        if (11000 === err.code) {
            var MongooseError = require('mongoose/lib/error')
            var valError = new MongooseError.ValidationError(err)
            // valError.errors["message"] = new MongooseError.ValidatorError('message', 'Duplicate found', err.err)
            valError["message"] = "name already taken";
            valError["status"] = 409;
            err = valError
            console.log("valError", valError)

            throwError(err.message,err.status,next)
        }


        // throw err;
    })
}
function throwError(message, status, next) {
    let err = new Error();
    err.status = status;
    err.message = message;
    next(err);
}
module.exports = UserClass