	//При вызове скрипта указываем имя файла по ключу -f
	
	var argv = require('minimist')(process.argv.slice(2));
	var readline = require('readline');
	var fs = require('fs');
	var path_to_file = argv.f;
	var rl = readline.createInterface({
		input: process.stdin, // ввод из стандартного потока
		output: process.stdout // вывод в стандартный поток
	});
	max = 1,
	min = 0;
	
	//рандомный выбор 0 или 1
	getRandomNumb = function(numb){		
			return Math.floor(Math.random(numb) * 1) + 1;
	}

	writeToFile = function(GameResult,path_to_file){
		fs.appendFile(path_to_file, GameResult, function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
		});
	}


	console.log('Start game - Please type 0 or 1');		

	rl.on('line',function(numb){

		var rand = getRandomNumb(numb);

		if(numb == min || numb == max){
			if(numb == rand){
				var GameResult = 'win\n';
				console.log('You win! '+ numb +' is a right answer');
			}
			else{
				var GameResult = 'lose\n';
				console.log('You lose! ' + numb + ' it\'s a wrond answer');
				
			}
			rl.close();
				//пишем в файл результат 
			writeToFile(GameResult,path_to_file);
		}
		else{
			console.log('Please type 0 or 1')
		}
	});

