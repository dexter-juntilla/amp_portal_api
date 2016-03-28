* API DOCUMENTATION

Code Structure (MUST BE IMPLEMENTED OR ELSE CODE WILL BE REMOVE) 

	Name Conventions (VARIABLE AND FUNCTION NAME MUST BE RELEVANT TO THE PROCESS)
		- Variable names written as Underscores 
			* if you think the variable name you make its hard to understand make a comment.
				e.g 
					var level; // indentation level

		- Function names written as camelCase
				sample format [method + process] e.g getUser()
				if the function process is to get the list of user then  
					the function name should be getUserList() not getUsers()
				LETS AVOID PLURAL FORM IN OUR FUNCTION NAME

		Note: 
			* DON'T ABBREVIATE THE VARIABLE or FUNCTION

	ROUTES
		- route format should be like this: /[controller]
				e.g if you want to get the list of user should be  /user/list
		- be familiar with http method when to use 
			* GET
			* POST
			* PUT
			* DELETE
					
		Note: 
			- NO PLURAL FORM IN ROUTES 
			- IN SERVICE URI NO HTTP METHOD
				e.g /user/post (redundant)

	WHITESPACE
		- A blank space should not be used between a function value and its invoking ( left parenthesis. This helps to distinguish 
		  between keywords and function invocations.
		- The word function is always followed with one space.
				e.g 
					function foo(c, d) {
						return c * d;
					}
		- No space should separate a unary operator and its operand except when the operator is a word such as typeof.
		- All binary operators should be separated from their operands by a space on each side except . period and ( left parenthesis and 	[ left bracket.
		- Every , comma should be followed by a space or a line break.
		- Each ; semicolon at the end of a statement should be followed with a line break.
		- Each ; semicolon in the control part of a for statement should be followed with a space.
		- If and While declaration must be like this:
				if (a == b)
				{
					return 'equal';
				}
				else
					return 'not equal'

	RESPONSE
		- AVOID the success: true response in every successful request
		- any error generated by server must be 500 status code while if its from the client must be 400 status code
		- follow the error format what i did in boilerplate
			e.g 
				{
					code: 'BadRequest',
					message: 'Incorrect Password'
				}

	TESTS 
		- make sure each api you make have tests
			sample you have login api first create a file, 
			name of file must be the controller name if the file doesnt exist in tests folder
		- make sure you test in this order 
				1. test each parameter if null or empty (for those required parameter)
				2. test if the given data is incorrect you should response 400 http status code
				3. test if the given data is correct you should response 200 htpp status code

	DOCUMENTATION
		- make sure each api you make have documentation 
			* Parameter's if the method is PUT, POST or GET (if have query string)
			* Success response
			* Error response			
NOTE: 
	- GLOBAL VARIABLE ONLY FOR REQUIRE MODULE 
		e.g 
			var request = require('request')
		if you want to make a variable must be inside in that function
	- IN DATABASE MAKE SURE WHEN INSERTING/UPDATING DATETIME THE FORMAT SHOULD BE IN toISOSTRING() 
		AND ANY PHONE NUMBER THAT BEING SAVE IN DATABASE MUST BE IN CLEAN FORMAT 
			e.g 949-2423-671 must be 9492423671
	- DONT FORGET THE LOGS ***
	- Adding a return keyword before every callback invocation