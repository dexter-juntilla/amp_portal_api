/**
* @api {get} /user/:user_id Get User
* @apiName getUser
* @apiGroup User
* @apiSuccess {String} id User Id
* @apiSuccess {String} email User Email
* @apiSuccess {String} name User Name
* @apiSuccess {String} password User Password
* @apiUse InternalError
*/

/**
* @api {get} /user/list Get List User
* @apiName getUserList
* @apiGroup User
* @apiSuccess {Number} count Number of user
* @apiSuccess {Object} data List of user
* @apiUse InternalError
*/

/**
* @api {post} /user Create User
* @apiName createUser
* @apiGroup User
* @apiParam  {String} email User Email
* @apiParam  {String} name User Name
* @apiParam  {String} password User Password
* @apiSuccess {String} id User Id
* @apiSuccess {String} email User Email
* @apiSuccess {String} name User Name
* @apiSuccess {String} password User Password
* @apiUse EmailAlreadyExists
* @apiUse InternalError
*/

/**
* @api {put} /user Update User
* @apiName editUser
* @apiGroup User
* @apiParam {String} user_id User Id
* @apiParam {String} email User Email
* @apiParam {String} name User Name
* @apiParam {String} password User Password
* @apiSuccess {Boolean} updated Check if the user updated or not 
* @apiUse UserNotFound
* @apiUse InternalError
*/

/**
* @api {delete} /user/:user_id Remove User
* @apiName removeUser
* @apiGroup User
* @apiSuccess {Boolean} deleted Check if the user deleted or not   
* @apiUse UserNotFound
* @apiUse InternalError
*/