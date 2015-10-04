	//При вызове скрипта указываем имя файла по ключу -f
	
	var argv = require('minimist')(process.argv.slice(2));
	var readline = require('readline');
	var fs = require('fs');
	var path_to_file = argv.f;

	//читаем файл
	fs.readFile( path_to_file, function (err, data) {
	 	if (err) throw err;
	 	//файл в строку
		var results = data.toString() + '';

		var arrayGames = results.split('\n');
		//общее кол-во игр
		var countGames = arrayGames.length - 1;
		//считаем кол-во выигр.
		var winGames = arrayGames.filter(function(games) {
	  		return games == 'win';
		});
		//общее кол-во выигр. игр
		var countWins = winGames.length;
		//считаем кол-во проигр
		var loseGames = arrayGames.filter(function(games) {
	  		return games == 'lose';
		});
		//общее кол-во проигр. игр
		var countLose = loseGames.length;
		//считаем соотношение
		var winslose = countWins/countLose;
		var losewins = countLose/countWins;
		//выводим все в консоль
		console.log('Play games = ' + countGames);
		console.log('Win games = '+ countWins + ':' + 'Lose games = '+ countWins);
		console.log('Win/lose = ' + winslose + ':' + losewins );
	
	});
	

	



	
	

