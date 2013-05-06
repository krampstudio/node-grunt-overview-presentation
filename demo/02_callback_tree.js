
	var http = require('http'),
		fs = require('fs'),
		util = require('util'),
		os = require('os');

//create an http server
http.createServer(function processRequest(request, response){	//1

    var file = os.tmpdir() + '/node-acess.log';
	var now = new Date().getTime();
	var log = util.format('%d : [%s on %s] %s\r\n', now, request.method, request.headers.host, request.url);
				
    //check if log file exists
	fs.exists(file, function(exists){	//2 

		if(exists === true){

            //stat the log file
			fs.stat(file, function(err, stat){ 	//3

				if(err || !stat.isFile()){
					response.writeHead(500);
					return;
				} 
					
                //append the log to the file
				fs.appendFile(file, log, 'utf8', function(err){ //4
					if(err){
						console.error("unable to write to %s : %j", file, err);
						response.writeHead(500);
						return;
					} 
					console.log("%s writtent to %s", log, file);

                    //send the response
					response.writeHead(200, {'Content-Type': 'text/plain'});
					response.end('Hello Yajug');
				});
			});
		}
	});
}).listen(8000);
