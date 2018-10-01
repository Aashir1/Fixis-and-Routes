var mongoose = require('mongoose');
var mongodbUrl = 'mongodb://aashir:aashir123@ds125381.mlab.com:25381/server';
mongoose.connect(mongodbUrl)
mongoose.connection.once('open', () => {
    console.log('connection is establised: ');
}).on('error', () => {
    console.log('error occured');
});
module.exports = mongoose;