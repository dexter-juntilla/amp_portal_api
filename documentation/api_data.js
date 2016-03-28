define({ "api": [
  {
    "type": "post",
    "url": "/user",
    "title": "Create User",
    "name": "createUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"code\": \"BadRequest\",\n  \"message\": \"Email already exist\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/user",
    "title": "Update User",
    "name": "editUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "updated",
            "description": "<p>Check if the user updated or not</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"code\": \"BadRequest\",\n  \"message\": \"User does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/:user_id",
    "title": "Get User",
    "name": "getUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/list",
    "title": "Get List User",
    "name": "getUserList",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Number of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>List of user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/user/:user_id",
    "title": "Remove User",
    "name": "removeUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "deleted",
            "description": "<p>Check if the user deleted or not</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"code\": \"BadRequest\",\n  \"message\": \"User does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/utility/alive",
    "title": "Check if service is alive",
    "name": "serviceAlive",
    "group": "Utility",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "api",
            "description": "<p>Check if API is up</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/documentations/utility.js",
    "groupTitle": "Utility",
    "error": {
      "fields": {
        "Error 4xx - 5xx": [
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code</p>"
          },
          {
            "group": "Error 4xx - 5xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 500 Internal Server\n{\n  \"code\": \"InternalError\",\n  \"message\": \"hello is not defined\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
