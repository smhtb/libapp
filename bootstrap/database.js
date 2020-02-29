const mongoose = require('mongoose');

const url = 'mongodb://localhost/libapp';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

module.exports = mongoose;