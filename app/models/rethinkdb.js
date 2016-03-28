var r 	 = require('rethinkdb')
 ,  Base = require('./base');

var RethinkdbModel = function(connection) {
	RethinkdbModel.connection = connection;
	return RethinkdbModel;
}

RethinkdbModel.create = function(data, table, callback) {
	winston.info('RethinkdbModel - create [table: %s| data: %s]', table, util.inspect(data));
	data = Base.cleanPhoneFormat(data, ['phone', 'fax']);
	data.created_date = moment.utc().toISOString();

	r.table(table).insert(data).run(RethinkdbModel.connection, function(err, result) {
		if(err) 
		{
			winston.error('RethinkdbModel - create [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
			return callback(null, result);
	});
}

RethinkdbModel.update = function(data, table, callback) {
	winston.info('RethinkdbModel - update [table: %s| data: %s]', table, util.inspect(data));
	data = Base.cleanPhoneFormat(data, ['phone', 'fax']);  
	
	r.table(table).get(data.id).update(data).run(RethinkdbModel.connection, function(err, result) {
		if(err) 
		{
			winston.error('RethinkdbModel - update [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
			return callback(null, result);
	});
}

RethinkdbModel.destroy = function(id, table, callback) {
	winston.info('RethinkdbModel - destroy [table: %s| id: %s]', table, id);

	r.table(table).get(id).delete().run(RethinkdbModel.connection, function(err, result){
		if(err) 
		{
			winston.error('RethinkdbModel - destroy [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
			return callback(null, result);
	});
}

RethinkdbModel.findById = function(id, table, callback) {
	winston.info('RethinkdbModel - findById [table: %s | id: %s]', table, id);

	r.table(table).get(id).run(RethinkdbModel.connection, function(err, result){
		if(err) 
		{
			winston.error('RethinkdbModel - findById [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
			return callback(null, result);
	});
}

RethinkdbModel.find = function(filter, table, callback) {
	winston.info('RethinkdbModel - find [table: %s | filter: %s]', table, util.inspect(filter));

	r.table(table).filter(filter).run(RethinkdbModel.connection, function(err, cursor){
		if(err) 
		{
			winston.error('RethinkdbModel - find [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
		{
			cursor.toArray(function(error, result) {
				return callback(null, result);
			});
		}
	});
}

RethinkdbModel.findOne = function(filter, table, callback) {
	winston.info('RethinkdbModel - findOne [table: %s | filter: %s]', table, util.inspect(filter));

	r.table(table).filter(filter).splice(0,1).run(RethinkdbModel.connection, function(err, cursor){
		if(err) 
		{
			winston.error('RethinkdbModel - findOne [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
		{
			cursor.toArray(function(error, result) {
				return callback(null, result);
			});
		}
	});
}

RethinkdbModel.list = function(order, table, callback) {
	winston.info('RethinkdbModel - find [table: %s | order: %s]', table, util.inspect(order));

	r.table(table).orderBy(order).run(RethinkdbModel.connection, function(err, cursor){
		if(err) 
		{
			winston.error('RethinkdbModel - list [Error: %s]', util.inspect(err));
			return callback(err, null);
		}
		else
		{
			cursor.toArray(function(error, result) {
				return callback(null, result);
			});
		}
	});
}

module.exports = RethinkdbModel;