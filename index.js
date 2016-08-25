// var cool = require('cool-ascii-faces');
var express = require('express');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index')
});

app.get('/.json', function(req, response) {
	request('https://www.reddit.com/r/soccer/top/.json?sort=top&t=week', function (error, res, body) {
	    //Check for error
	    if(error){
	    	return console.log('Error:', error);
	    }
	    //Check for right status code
	    if(res.statusCode !== 200){
	    	return console.log('Invalid Status Code Returned:', res.statusCode);
	    }
	    //All is good. Print the body
	    response.json(body);
	});
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
