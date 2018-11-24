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
    }

});
const User = db.model("user", UserSchema);


module.exports =User;