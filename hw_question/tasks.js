
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
	list: function(callback) {
		knex.select('task').from('tasks').asCallback(function(err, tasks) {
      		if (err) return console.error(err);

      		callback(tasks);

      	});
	},

	add: function(task, callback) {
		knex('tasks').insert({task: task});
	},
	
	change: function(id, text, callback) {
		// TODO
	},

	complete: function(id, callback) {
		// TODO
	},

	delete: function(id, callback) {
		// TODO
	}
};

module.exports = Tasks;