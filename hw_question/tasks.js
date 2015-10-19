
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'wpcrud47',
      database : 'testnodebd',
      charset  : 'utf8'
    },
    pool: {
      min: 0,
      max: 7
    }
});

var Tasks = {
	list: function(callback) { // получаем все задачи
		knex.select('*').from('tasks').asCallback(function(err, data) {
      		if (err) return callback(err, null)
                
      		callback(null, data);
      	});
	},
	getOne: function(id,callback) { //получаем одну задачу для изменения
		knex('tasks').where({
			'id' : id
		}).select('task').asCallback(function(err, data) {
  		if(err){
         return console.error(err);
        callback(err, null);
      }
      else{
        //console.log(data);
        callback(null, data);
      }		
    });
	},

	add: function(data, callback) { //добавляем задачу
		knex('tasks')
			.insert({task: data})
			.returning('id').asCallback(function(err, id) {
      		if (err) return callback(err, null)
                
      		callback(null, id);
      	});

	},
	
	change: function(id, text, callback) { // изменяем задачу
		knex('tasks')
		  .where({'id' : id})
		  .update({
		    task: text
		  }).asCallback(function(err, id) {
      		if (err) return callback(err, null)
                
          console.log(id);      
      		callback(null, id);
      	});

	},

	complete: function(id, callback) {
		// TODO
	},

	del: function(id, callback) { // удаляем задачу
		knex('tasks')
  		.where({'id': id})
  		.del()
  		.asCallback(function(err) {
      		if (err) return callback(err, null)

          var result = 'delete success';
      		callback(null, result);
		  });
  },
  login: function(log, pas, callback) {
    knex('user').where({
      'username' : log
    }).select('username, password').asCallback(function(err, data) {
      if(err){
         return console.error(err);
        callback(err, null);
      }
      else{
        callback(null, data);
      }   
    });
  }
};

module.exports = Tasks;