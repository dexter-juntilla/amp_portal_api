var Utilityserver = function(config) {
	for(method in Utilityserver) {
		Utilityserver[method](config.server, config.controllers.utility);
	}
	return Utilityserver;
}

Utilityserver.get = function(server, utility) {
	server.get('/utility/alive', utility.serviceAlive);
};

Utilityserver.post = function(server, utility) {
};

Utilityserver.put = function(server, utility) {
};

Utilityserver.del = function(server, utility) {
};

module.exports = Utilityserver;