var UserRoute = function(config) {
	for(method in UserRoute) {
		UserRoute[method](config.server, config.controllers.user);
	}
	return UserRoute;
}

UserRoute.get = function(server, user) {
	server.get('/user/list', user.getUserList);
	server.get('/user/:id', user.getUser);
};

UserRoute.post = function(server, user) {
	server.post('/user', user.createUser);
};

UserRoute.put = function(server, user) {
	server.put('/user', user.updateUser);
};

UserRoute.del = function(server, user) {
	server.del('/user/:id', user.removeUser);
};

module.exports = UserRoute;