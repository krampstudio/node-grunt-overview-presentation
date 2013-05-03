> DRAFT

# Deck Plan

1. Node.js
   1. Why I present node?
     - buzz? 
     - see packages numbers
     - javascript everywhere
   2. What's node?
     - The hidden son of Google and Netscape
   3. History
     - 2008: Ryan Dahl needed a new way to build _real-time_ web app (push based), with 2 priorities: scalability and simplicity.
     - Netscape -> JS -> JavaScript the good parts
     - Gmail -> Chome -> V8
     - Non blocking I/O for scalability
     - JS for simplicity
    4. Why JS?
     - Functionnal language : callbacks, event loop and event driven programming feets well the everything must be non blocking approach
     - Interpreted language : simple to use and to extends
     - JS becomes popular
    5. Architecture
      - Inspired from: Tornado (python), Twisted (python), Time Machine (ruby), libevent (C), ngixn 
      - Only one process (no threads, etc.) 
      - No blocking I/O: the unique process share the memory and can run something else by waiting the end of the I/O
      - Event driven model (main loop, then event execution sequentially)
      - CommonJs
      - Provides only core APIs to manage file system, network, etc. nothing superfluous (Batteries NOT included)
      - Unix based
    6. APIs
     - Streams
     - network (http)
     - fs
     - utils
     - process
    7. Patterns
     - Callbacks (trees and promises)
     - Events (EventEmitter)
     - Middleware (connect)
2. NPM
3. Grunt
4. Demo

# Content

## Middleware pattern

A simplified middleware implementation:

	var app = {
		stack : [],
		use : function(middleware){
	
			var fn = middleware;
			if('function' === typeof middleware.handle){
				fn = middleware.handle;
			}
		
			if('function' === typeof fn){
				this.stack.push(fn);
			}
		},

		handle : function(data){
			var i = 0, layer;
			for(i in this.stack){
				layer = this.stack[i];
				if(!layer(data)){
					break;
				}
			}
		}
	};

	app.use(function(data){
		console.log("Hello %s", data);
		return  true;
	});
	app.use(function(data){
		console.error("Goodbye %s", data);
		return false;
	});

	app.handle('middleware');


Express uses Conntect requests middleware:

	var express = require('express'),
		app = express();
	
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use('/', function auth(err, req, res, next){
	  if(checkAuth(req){
		next();
	  } else {
		next(new Error("not authorized"));
	  }
	});
	app.use(function errorHandling(err, req, res, next){
	  console.error(err.stack);
	  res.send(500, 'Something broke!');
	});

	app.get('/', function(req, res){
	  res.send('hello world');
	});

	app.listen(80);


# Resources

- [threaded vs noblocking servers post](http://amix.dk/blog/post/19581)
- [middleware](http://stephensugden.com/middleware_guide/)
