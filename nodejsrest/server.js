var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/addUser', function (req, res) {
	// First read existing users.
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		console.log('req' , JSON.stringify(req.body));
		var user = {
		   "user4" : {
			  "name" : req.body.name,
			  "password" : req.body.password,
			  "profession" : req.body.profession,
			  "id": req.body.id 
		   }
		}
		data = JSON.parse( data );
		data["user4"] = user['user4'];
		console.log( data );
		res.send( JSON.stringify(data));
		//res.end( JSON.stringify(data));
	});
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


var id = 2;

app.get('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})