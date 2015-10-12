var tasks = require('./models/tasks');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var templates = require('consolidate');
app.engine('hbs',  templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//app.use(express.static(__dirname));

//var request = require('request');
var urlutils = require('url');
var cheerio = require('cheerio');
var $ = cheerio;

app.get('/', function(req, res) {
	tasks.list(function(err, bdansw) {
			console.log(bdansw);
			templates.handlebars(
			'views/tasks.hbs', 
			{tasks: bdansw},
			function(err, html) {
				if (err) 
					throw err;

				console.log(html);

				res.render('layout.hbs', {
					content: html
				});
			}
		)
	});
});


app.post('/', function(req, res) {
	tasks.add(req.body.task, function() {
		res.redirect('/');
	});
});
app.listen(3000);