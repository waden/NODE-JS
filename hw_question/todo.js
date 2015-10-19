var tasks = require('./models/tasks');

var express = require('express');
var app = express();
//var cheerio = require('cheerio');

var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//сессии и куки
var cookieParser = require('cookie-parser');
app.use(cookieParser()); //req.cookies
var session = require('cookie-session');
app.use(session({keys: ['secret']}));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;

//логин шаблон
passport.use(new LocalStrategy(function(username, password, done){

	console.log(username,password);

	//внутри функции связываться с базой для сверки логина и пароля?
	tasks.login(username, password, function(err, answ) {
		if(err) console.log(err);	
			
		if(answ == 'success'){
			return done(null, true, { message: 'Успешная авторизация!'});
		}
		return done(null, false, { message: 'Неправильный логин или пароль!'});
	});

}));


//работа с шаблоном и статикой
var templates = require('consolidate');
app.engine('hbs',  templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));


//var request = require('request');
var urlutils = require('url');
var cheerio = require('cheerio');
var $ = cheerio;

// -----------------   РАБОТА С ЛОГИНОМ  -------------------

app.get('/login', function(req, res) {

	res.render('login.hbs');

});

app.get('/logout', function(req, res) {

	req.logout();
	res.redirect('/login');

});


// в сл. усп. пишем username в сессию
passport.serializeUser(function(user, done) {
	done(null, user.username);
});

// в случае неуспешной авторизации
passport.deserializeUser(function(id, done) {
	done(null, { username: id } );
});

var auth = passport.authenticate(
	'local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}
);
//если не автозирозован переправляем на login
var mustBeAuth = function(req,res,next) {
	req.isAuthenticated() ? next() : res.redirect('/login');
}

app.all('*', mustBeAuth);

// -----------------   РАБОТА С ЛОГИНОМ (END)  -------------------

app.get('/', function(req, res) {
	//если есть параметр del, удаляем task
	if(req.query.del){
		tasks.del(req.query.del, function(err,result) {
			if (err) console.error(err);

				console.log(result);
		});
	}
	//грузим список всех задач
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
});


app.post('/getone', function(req, res) {
	//получение задачи в ед. экземляре
	if(req.body.change){
		tasks.getOne(req.body.change, function(err,data) {
			if (err){
				console.error(err);
			}
			else
			{
				res.send(data[0].task);
			}

		});
	}
});

app.post('/', function(req, res) {
	//добавление новой задачи
	if(req.body.task){
		tasks.add(req.body.task, function(err, id){
			if(err) console.log(err);
			console.log(id);
			res.redirect('/');
		});
	}
	//обновление задачи
	if(req.body.upd){
		tasks.change(req.body.id, req.body.upd, function(err, status){
			if(err) console.log(err);
			console.log(status);
			res.redirect('/');
		});
	}
});


app.listen(3000);