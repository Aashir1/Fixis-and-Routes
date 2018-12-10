let jwt = require('jsonwebtoken');
let validator = require('validator');
let UserModel = require('../Model/AuthModel');
let throwError = require('../ErrorHandler/Error');
const key = "fixs-and-routes";
let bcrypt = require('bcrypt');
class ChangePasswordController {
    static async changePassword(req, res, next) {
        let { email, newPassword, name } = req.body;
        if (!email || !newPassword || !validator.isEmail(email)) {
            return throwError("invalid data", 422, next);
        } else {
            let hash = await bcrypt.hash(newPassword, 10);
            UserModel.findOneAndUpdate({ email: email }, { pass: hash }, (err, data) => {
                console.log("updated data from database: ", data);
                console.log("err: ", err);
                if (!err) {
                    jwt.sign({ name: name, email: email }, key, (error, token) => {
                        console.log("error: ", error)
                        if (!error) {
                            return res.json({
                                status: "success",
                                token,
                                user: { name: data.name, email: email, _id: data._id }
                            })
                        }
                        return throwError("", 401, next)
                    })
                }
                return throwError("err.message", 500, next);
            })
        }
    }
}

module.exports = ChangePasswordController;