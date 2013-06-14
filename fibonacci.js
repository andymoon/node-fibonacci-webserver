var http = require('http'),
	querystring = require('querystring'),
	url = require("url"),
	cluster = require("cluster");

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < 4; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
	http.createServer(function (req, res) {
		var parsedUrl = url.parse(req.url);
		var n = querystring.parse(parsedUrl.query).values;
			res.writeHead(200, {'Content-Type': 'text/plain'});
		if(n){
			var result = fibonacci(n);
			res.end(result.toString());
		}
		res.end("hello")
		
	}).listen(8081, '127.0.0.1');

	console.log('Server running at http://127.0.0.1:8081/');
}

function fibonacci(n){
	var result;
	if (n < 2) {
		result = 1
	} else {
		result = fibonacci(n-2) + fibonacci(n-1)
	}
	return result;
}