var request = require('request');
var cheerio = require('cheerio');
var host = "http://kpsihology.ru/";

var arr = [];
var articles = [];
var i;

requestArt = function(element,i){
	//если i не задана, устанавливаем как 0;
	 i = typeof i !== 'undefined' ?  i : 0;

	var len = element.length;
 		//если не прошли по всем делаем запрос вновь
 		if(i !== len){
 			//делаем запрос к определенной странице сайта
 			request(element[i],function(error,response,html){
				if(!error && response.statusCode == 200){
					var $ = cheerio.load(html);
					var art = [];
					art.push($('h1').text());
					//получаем все p идущие после h1
					art.push($('h1 ~ p').text());
					articles.push(art);
					i++;
					requestArt(arr,i);
				}
				else{
					console.log(error);
				}
			});
 		}
 		//когда мы прошли по всем ссылкам, возвращаем массив статей
		else{
			var c;
			for(c = 0; c <= len; c++ ){
				console.log( articles[c][0] + articles[c][1]);
			}
		}
}

// получаем основной список статей с сайта
request(host,function(error, response, html){

 	if(!error && response.statusCode == 200){
 		var $ = cheerio.load(html);
 		
 		$('.first-block li a').each(function(i, element){
 			//получаем href'ы статей
 			arr.push(host + $(element).attr('href'));
 			//передаем их в метод подгрузки 
 			requestArt(arr);

 		});
 		
 	}else console.log(error);
 	
 });


	

	

