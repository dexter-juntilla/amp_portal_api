/**
* @apiDefine InternalError
*
* @apiError (Error 4xx - 5xx) {String} code Status code
* @apiError (Error 4xx - 5xx) {String} message Error message
*
* @apiErrorExample Error-InternalError:
*     HTTP/1.1 500 Internal Server
*     {
*       "code": "InternalError",
*       "message": "hello is not defined"
*     }
*/

/**
* @apiDefine Unauthorized
*
* @apiError (Error 4xx - 5xx) {String} code Status code
* @apiError (Error 4xx - 5xx) {String} message Error message
*
* @apiErrorExample Error-Unauthorized:
*     HTTP/1.1 401 Unauthorized
*     {
*       "code": "Unauthorized",
*       "message": "Unauthorized User"
*     }
*/ 

/**
* @apiDefine EmailAlreadyExists
*
* @apiError (Error 4xx - 5xx) {String} code Status code
* @apiError (Error 4xx - 5xx) {String} message Error message
*
* @apiErrorExample Error-BadRequest:
*     HTTP/1.1 400 BadRequest
*     {
*       "code": "BadRequest",
*       "message": "Email already exist"
*     }
*/ 

/**
* @apiDefine UserNotFound
*
* @apiError (Error 4xx - 5xx) {String} code Status code
* @apiError (Error 4xx - 5xx) {String} message Error message
*
* @apiErrorExample Error-BadRequest:
*     HTTP/1.1 400 BadRequest
*     {
*       "code": "BadRequest",
*       "message": "User does not exist"
*     }
*/