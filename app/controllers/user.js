var UserController = {}
  , Model = require('../models/base');

UserController.getUser = function(req, res) {
	winston.info('UserController - getUser [Params: %s]', util.inspect(req.params));

	Model.rethinkdb.findById(req.params.id, 'tbl_User', function(err, users) {
		if (err) 
		{
			winston.error('UserController - getUser [Error: %s]', util.inspect(err));
			res.send(500, { code: 'InternalError', message: util.inspect(err) });
		} 
		else 
			res.send(200, users);
	});
}

UserController.getUserList = function(req, res) {
	winston.info('UserController - getUserList [Params: %s]', util.inspect(req.params));

	Model.rethinkdb.list('name', 'tbl_User', function(err, users) {
		if (err) 
		{
			winston.error('UserController - getUserList [Error: %s]', util.inspect(err));
			res.send(500, { code: 'InternalError', message: util.inspect(err) });
		} 
		else 
			res.send(200, users);
	}); 
}

UserController.createUser = function(req, res) {
	winston.info('UserController - createUser [Params: %s]', util.inspect(req.params));
	
    async.waterfall([
        // validate the data 
        function (callback) {
            Model.objectValidation(req.params, ['email', 'name'], function (response) {
                if (response.success === true)
                    callback(null);
                else
                    callback(response, null);
            })
        },
        // check the email if already exists in db
        function (callback) {
        	var filter = function(user) {
			 	return user("email").match('(?i)^' + req.params.email + '$')
			}

            Model.rethinkdb.find(filter, 'tbl_User', function (err, users) {
                if (err) 
                {
                    winston.error('UserController - createUser [find.tbl_User] [Error: %s]', util.inspect(err));
                    callback(err, null);
                } 
                else 
                {
                    if (users && users.length > 0) 
                    {
                        callback({
                            success: false,
                            message: 'Email is already used'
                        }, null);
                    } 
                    else
                        callback(null);
                }
            })
        },
        // create user
        function (callback) {
            var user = _.clone(req.params)
            user.status = 'Active'            

            Model.rethinkdb.create(user, 'tbl_User', function (err, insertedUser) {
                if (err) 
                {
                    winston.error('UserController - createUser [create.tbl_User] [Error: %s]', util.inspect(err));
                    callback(err, null);
                } 
                else
                {
                    user.id = insertedUser.generated_keys[0]
                    callback(null, user);
                }
            });
        }
    ], function (err, result) {
        if (err && err.success === false)
            res.send(400, { code: 'BadRequest', message: err.message });
        else if (err)
            res.send(500, { code: 'InternalError', message: util.inspect(err) });
        else
            res.send(200, result)
    });
}

UserController.updateUser = function(req, res) {
	winston.info('UserController - updateUser [Params: %s]', util.inspect(req.params));

    async.waterfall([
        // validate the data 
        function (callback) {
            Model.objectValidation(req.params, ['id'], function (response) {
                if (response.success === true)
                    callback(null);
                else
                    callback(response, null);
            })
        },
        // check the id if already exists in db
        function (callback) {
            Model.rethinkdb.findById(req.params.id, 'tbl_User', function (err, user) {
                if (err) 
                {
                    winston.error('UserController - updateUser [findById.tbl_User] [Error: %s]', util.inspect(err));
                    callback(err, null);
                } 
                else 
                {
                    if (user)
                        callback(null);
                    else 
                        callback({
                            success: false,
                            message: 'User does not exist'
                        }, null);
                }
            })
        },
        // check the email if already exists in db
        function (callback) {
        	var filter = function(user) {
			 	return user("email").match('(?i)^' + req.params.email + '$')
			 	      .and(user("id").ne(req.params.id))
			}

            Model.rethinkdb.find(filter, 'tbl_User', function (err, users) {
                if (err) 
                {
                    winston.error('UserController - updateUser [find.tbl_User] [Error: %s]', util.inspect(err));
                    callback(err, null);
                } 
                else 
                {
                    if (users && users.length > 0) 
                    {
                        callback({
                            success: false,
                            message: 'Email is already used'
                        }, null);
                    } 
                    else
                        callback(null);
                }
            })
        },
        // update the user
        function (callback) {
            Model.rethinkdb.update(req.params, 'tbl_User', function (err, updatedUser) {
                if (err) 
                {
                    winston.error('UserController - updateUser [update.tbl_User] [Error: %s]', util.inspect(err));
                    callback(err, null);
                } 
                else
                    callback(null, { updated: (updatedUser.replaced || updatedUser.unchanged)? true: false });
            });
        }      
    ], function (err, result) {
        if (err && err.success === false)
            res.send(400, { code: 'BadRequest', message: err.message });
        else if (err)
            res.send(500, { code: 'InternalError', message: util.inspect(err) });
        else
            res.send(200, result)
    });
}

UserController.removeUser = function(req, res) {
  	winston.info('UserController - removeUser [Params: %s]', util.inspect(req.params));

	Model.rethinkdb.destroy(req.params.id, 'tbl_User', function(err, deletedUser) {
		if (err) 
		{
			winston.error('UserController - removeUser [Error: %s]', util.inspect(err));
			res.send(500, { code: 'InternalError', message: util.inspect(err) });
		} 
		else 
			res.send(200, { deleted: deletedUser.deleted? true: false });
	});	   
}

module.exports = UserController;