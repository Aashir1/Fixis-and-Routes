var User = require('../Model/AuthModel');
let throwError = require('../ErrorHandler/Error');

class UserUpdate {
    static UpdateBusName(req, res, next) {
        let { email, busName } = req.body;
        if (!email || !busName) {
            throwError("invalid body", 400, next);

        }
        User.findOneAndUpdate({ email: email }, { $set: { "userInfo.busName": busName } }, { new: true }).then(value => {
            let user = value;
            user.pass = undefined;
            res.json({ status: "success", user })
        }).catch(err => {
            throwError(err.message, 500, next);
        })
    }
    static updateStopLocation(req, res, next) {
        let { email, lat, lng } = req.body;
        if (!email || !lat||!lng) {
            throwError("invalid body", 400, next);
        }
        else {
            User.findOneAndUpdate({ email: email }, { $set: { "userInfo.stopLocation.lat": lat, "userInfo.stopLocation.lng": lng } }, { new: true }).then(value => {
                let user = value;
                user.pass = undefined;
                res.json({ status: "success", user })
            }).catch(err => {
                throwError(err.message, 500, next);
            })
        }
    }
    static updateProfile(req, res, next) {
        let { email, name, cmsId } = req.body;
        if (!email || !name || !cmsId) {
            throwError("invalid body", 400, next);

        }
        else {
            User.findOneAndUpdate({ email: email }, { $set: { "userInfo.cmsId": cmsId, }, name: name }, { new: true }).then(value => {
                let user = value;
                user.pass = undefined;
                res.json({ status: "success", user })
            }).catch(err => {
                throwError(err.message, 500, next);
            })
        }
    }
}
module.exports = UserUpdate;