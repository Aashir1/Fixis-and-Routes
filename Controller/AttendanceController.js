var AttendanceModel = require('../Model/AttendanceModel');
var throwError = require("../ErrorHandler/Error");


let currDate = `${new Date().getDate()}-${Number(new Date().getMonth()) + 1}-${new Date().getFullYear()}`

class AttendanceClass {
    static addAttendance(req, res, next, io) {
        let { rfid, bus_name } = req.body;
        if (!rfid || !bus_name) {
            throwError("invalid body", 422, next);
        }
        AttendanceModel.find({ $and: [{ date: currDate }, { rfid }, { bus_name }] }, (err, doc) => {
            if (!err && doc.length == 0) {
                let attendanceObj = new AttendanceModel({ rfid, bus_name, date: currDate });
                attendanceObj.save().then(doc1 => {
                    AttendanceModel.find({ $and: [{ date: currDate }, { bus_name }] }, (err, doc2) => {
                        io.sockets.emit(`att${bus_name}`, { numberOfStudents: doc2.length });
                        res.json({ status: "success", data: doc1, numberOfStudents: doc2.length })
                    })
                }).catch(err => {
                    throwError(err.message, 500, next)
                })
            } else if (err) {
                throwError(err.message, 500, next);
            } else {
                res.json({ status: "success", data: "your attendance has been marked already" })
            }
        });

    }
}
module.exports = AttendanceClass;