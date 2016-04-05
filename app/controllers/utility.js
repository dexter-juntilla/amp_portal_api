var UtilityController = {}
, Model = require('../models/base');

UtilityController.serviceAlive = function(req, res) {
  winston.info('UtilityController - serviceAlive [Params: %s]', util.inspect(req.params));
  // TODO: need to check the db before sending
  // for now just send api: true
  res.send(200, { api: true });
}

UtilityController.generatePdf = function(req, res) {
  winston.info('UtilityController - generatePdf [Params: %s]', util.inspect(req.params));

  Model.generatePDF(req.params.web_address, req.params.html, req.params.filename, function(err, response) {
    if(err)
    {
      winston.error('UtilityController - generatePdf [generatePDF] [Error: %s]', util.inspect(err));
      callback(err, null);
    }
    else
    {
      if(response.success)
      {
        res.send(200, {pdf_path:response.file_path})
      }
    }
  });
}
  module.exports = UtilityController;
