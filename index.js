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

app.get('/.json', function(req, res) {
	if(req.query.q){
		url = 'https://www.reddit.com/r/soccer/search.json?restrict_sr=on&q=' + req.query.q + '&sort=' + req.query.sort + '&t=' + req.query.time;
	} else {
		url = 'https://www.reddit.com/r/soccer/' + req.query.sort + '/.json?t=' + req.query.time + '&after=' + req.query.after;
		if (url.indexOf('undefined') > -1) {
			url = 'https://www.reddit.com/r/soccer/hot/.json'
		}
	}
	request(url, function (error, response, body) {
	    //Check for error
	    if(error){
	    	return console.log('Error:', error);
	    }
	    //Check for right status code
	    if(response.statusCode !== 200){
	    	return console.log('Invalid Status Code Returned:', response.statusCode);
	    }
	    //All is good. Print the body
	    data = JSON.parse(body);
	    res.send(data.data);
	});
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
