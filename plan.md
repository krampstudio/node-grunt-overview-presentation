> DRAFT

# Deck Plan

1. Node.js
   1. Why I present node?
     - buzz? 
     - see packages numbers
     - javascript everywhere
     - JIFSNIF
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
    6. APIs ?
     - Streams
     - network (http)
     - fs
     - utils
     - process
     - debug
     - tests
    7. Patterns
     - Callbacks (trees and promises)
     - Events (EventEmitter)
     - Middleware (connect)
2. NPM
3. Good to know (express, connect, meteor, sails, socket.io and ...) 
3. Grunt
4. Demo

# Content

## Callback model

For noblocking way

	var http = require('http'),
		fs = require('fs');

	function accessLog(request, callback){
		var now = new Date().getTime();
		var log = util.format('%d : [%s on %s] %s\r\n', now, request.method, request.headers.host, request.url);
		fs.appendFile('/tmp/node-acess.log', log, 'utf8', callback);
	}

	http.createServer(function processRequest(request, response){
		accessLog(log, function(err){
			if(err){
				res.writeHead(500);
				return;
			} 
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Hello Yajug');
		});
	}).listen(80);


Chrismas tree anti pattern

	var http = require('http'),
		fs = require('fs'),
		util = require('util'),
		os = require('os');

	http.createServer(function processRequest(request, response){	//1
		var file = os.tmpdir() + '/node-acess.log';
		var now = new Date().getTime();
		var log = util.format('%d : [%s on %s] %s\r\n', now, request.method, request.headers.host, request.url);
				
		fs.exists(file, function(exists){	//2 
			if(exists === true){
				fs.stat(file, function(err, stat){ 	//3
					if(err || !fs.isFile()){
						res.writeHead(500);
						return;
					} 
					
					fs.appendFile(file, log, 'utf8', function(err){ //4
						if(err){
							console.error("unable to write to %s : %j", file, err);
							res.writeHead(500);
							return;
						} 
						console.log("%s writtent to %s", log, file);
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.end('Hello Yajug');
					});
				});
			}
		});
	}).listen(80);


Future and Promises
	

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
