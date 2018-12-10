var db = require('../dbConnection');
const Schema = db.Schema;
var validator = require('validator');
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

    },
    pass: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (pass) => pass.length >= 8,
            message: 'password must be consist of 8 characters'
        }
    },
    userInfo: {
        cmsId: {
            type: Schema.Types.String,
            required: [true, "user Id is required"],
            unique: [true, 'id already taken by other user'],
            validate: {
                validator: (cmsId) => cmsId.length >= 7,
                message: "Id must be 7 character long"
            }
        },
        userType: {
            type: Schema.Types.String,
            required: [true, "UserType is required"],
            validate: {
                validator: (userType) => userType.length >= 7,
                message: "Wrong user type"
            }
        },
        stopLocation: {
            lat: {
                type: Schema.Types.Number,
            },
            lng: {
                type: Schema.Types.Number,
            }
        },
        busName: {
            type: Schema.Types.String,
            required: [true, "busName is required"],

        }

    }


});
const User = db.model("user", UserSchema);


module.exports = User;