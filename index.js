
var app = require('./server/server.js');

// Port will be used on server or locally
var port = process.env.PORT || 4568;

// start listening to requests on port 4568
app.listen(port);

console.log('Server now listening on port ' + port);
