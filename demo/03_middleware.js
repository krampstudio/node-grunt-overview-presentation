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
