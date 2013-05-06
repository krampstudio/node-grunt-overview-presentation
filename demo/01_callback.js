var http = require('http'),                                                                                     				
    fs = require('fs'),
    util = require('util');                                                                                     				
                                                                                                                                         
function accessLog(request, callback){                                                                          				
	var now = new Date().getTime();                                                                         				
	var log = util.format('%d : [%s on %s] %s\r\n', now, request.method, request.headers.host, request.url);				
    console.log("Logging : %s", log);
	fs.appendFile('/tmp/node-acess.log', log, 'utf8', callback);                                            				
}                                                                                                               				
                                                                                                                                         
http.createServer(function processRequest(request, response){                                                   				
	accessLog(request, function(err){                                                                           				
	if(err){                                                                                        				
		response.writeHead(500);                                                                     				
		return;                                                                                 				
	}                                                                                               				
	response.writeHead(200, {'Content-Type': 'text/plain'});                                             				
	response.end('Hello Yajug');                                                                         				
	});                                                                                                     				
}).listen(8000);                                                                                                  				
