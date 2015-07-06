var express = require('express');
var app = express();

app.use(express.static('test'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

console.log(process.env.PORT, process.env.IP);
var server = app.listen(process.env.PORT, process.env.IP, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});