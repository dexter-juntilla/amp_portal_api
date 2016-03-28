module.exports = function (req, res, next) {
	winston.info('authentication [username: %s]', req.username);

	if(nconf.get('allow_authentication'))
	{
		if(req.username == nconf.get('BASIC_NAME') && req.authorization.basic.password == nconf.get('BASIC_PASSWORD'))
			return next();
		else
			res.send(401, { message: 'Unauthorized.' })
	}
	else
		return next(); 
}