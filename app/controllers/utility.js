var UtilityController = {}
  , Model = require('../models/base');

UtilityController.serviceAlive = function(req, res) {
	winston.info('UtilityController - serviceAlive [Params: %s]', util.inspect(req.params));
	// TODO: need to check the db before sending
	// for now just send api: true
	res.send(200, { api: true }); 
}

module.exports = UtilityController;