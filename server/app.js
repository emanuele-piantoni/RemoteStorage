var express = require('express');
var app = module.exports = express();

//impostare una rotta di default
//impostare una callback per la rotta di default
app.get('/', function(req, res){
	res.send('Hello world');
});

//questo significa che quando la rotta indentifica un file su disco, restituisce il file
app.use(express.static(__dirname + '/../client'));

//callback viene lanciata quando il server è run
var server = app.listen(3000, function(){
	console.log('Listening on port 3000'); 
});