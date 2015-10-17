var tasks = require('./models/tasks');

var express = require('express');
var app = express();
var cheerio = require('cheerio');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var templates = require('consolidate');
app.engine('hbs',  templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));


//var request = require('request');
var urlutils = require('url');
var cheerio = require('cheerio');
var $ = cheerio;

app.get('/', function(req, res) {
	//если есть параметр del, удаляем task
	if(req.query.del){
		tasks.del(req.query.del, function(err,result) {
			if (err){
				console.error(err);
			}else
			{
				//console.log(result);
				//res.redirect('/');

			}
		});
	}
	//подгружаем список задач на страницу
	function GetArticles(){
		tasks.list(function(err, bdansw) {
			templates.handlebars(
				'views/tasks.hbs', 
				{tasks: bdansw},
				function(err, html) {
					if (err) 
						throw err;
					res.render('layout.hbs', {
						content: html
					});
				}
			)
		});
	}
	GetArticles();
});
app.post('/getone', function(req, res) {
	if(req.body.change){
		tasks.getOne(req.body.change, function(err,data) {
			if (err){
				console.error(err);
			}
			else
			{
				console.log(data);
				var m = JSON.parse(data);
				console.log(m);
				res.end(m.task);
			}
		});
	}
});

app.post('/', function(req, res) {

	if(req.body.task){
		tasks.add(req.body.task, function(err, id){
			if(err) console.log(err);
			console.log(id);
			res.redirect('/');
		});
	}
	// if(req.body.change){
	// 	tasks.change(req.body.taskid, req.body.tasktext,function(err, status){
	// 		if(err) console.log(err);
	// 		console.log(status);
	// 		res.redirect('/');
	// 	});
	// }
});
app.listen(3000);