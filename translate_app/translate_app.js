//перевод работает когда мы вводим слова в запросе после ? и через + 

var http = require('http');
var request = require('request');
var url = require('url');
var key = ''; //получаем ключ здесь - http://api.yandex.ru/key/form.xml?service=trnsl

http.createServer(function(req,res){
	res.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
  	var urlstr = url.parse(req.url);
  		if(urlstr.query !== null){
  			var text = 'text=' + urlstr.query
  			var yandex = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+ key + '&'+ text + '&lang=en-ru';
  			console.log(yandex);
		 	request({
			method:'POST',
			uri: yandex
			},function(error, response, body){
				if(error){
					console.log(error);
				}else{
					var resp = response.body;
					var txt= JSON.parse(resp);
					res.end(txt.text+'');
				}
			});
  		}
}).listen(8888);





	

