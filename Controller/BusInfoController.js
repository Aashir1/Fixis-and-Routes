var BusInfo = require('../Model/BusInfoModel');
var throwError = require("../ErrorHandler/Error");
class BusInfoClass {
    static getInfo(page, res, next) {
        var perPage = 10
        var page = page || 1;
        BusInfo.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, infos) {
                BusInfo.count().exec(function (err, count) {
                    if (err) {

                        throwError(err.message, 404, next);
                    }
                    if (page == Math.ceil(count / perPage)) {
                        res.json({
                            status: "success",
                            info: infos,
                            currentPage: page,
                            hasMorePages: false,
                            pages: Math.ceil(count / perPage)
                        })
                    } else {
                        res.json({
                            status: "success",
                            info: infos,
                            currentPage: page,
                            hasMorePages: true,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                })
            })
    }
}

module.exports = BusInfoClass;