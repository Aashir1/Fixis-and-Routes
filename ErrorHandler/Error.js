module.exports=function throwError(message, status, next) {
    let err = new Error();
    err.status = status;
    err.message = message;
    next(err);
}