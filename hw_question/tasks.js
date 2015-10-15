
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
		knex.select('*').from('tasks').asCallback(function(err, data) {
      		if (err) return console.error(err);
                
      		callback(null, data);
      	});
	},
	listOne: function(id,callback) {
		knex('tasks').where({
			'id' : id
		}).select('task').asCallback(function(err, data) {
      		if (err) return console.error(err);
                
      		callback(null, data);
      	});
	},

	add: function(data, callback) {
		knex('tasks')
			.insert({task: data})
			.returning('id').asCallback(function(err, id) {
      		if (err) return console.error(err);
                
      		callback(null, id);
      	});

	},
	
	change: function(id, text, callback) {
		knex('books')
		  .where({'id' : id})
		  .update({
		    task: text
		  }).asCallback(function(err, id) {
      		if (err) return console.error(err);
                
      		callback(null, id);
      	});

	},

	complete: function(id, callback) {
		// TODO
	},

	del: function(id, callback) {
		knex('tasks')
  		.where({'id': id})
  		.del()
  		.asCallback(function(err) {
      		if (err) return console.error(err);

          var result = 'delete succec';
                
      		callback(null, result);
		  });
    }
};

module.exports = Tasks;