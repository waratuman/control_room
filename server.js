var fs = require('fs'),
    sys = require('sys'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    mime = require('mime');

var server = http.createServer( function(request, response) {
  var pathname = url.parse(request.url).pathname;
  if (pathname == "/") pathname = "index.html";
  var filename = path.join(process.cwd(), 'public', pathname);
  
  path.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found");
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': mime.lookup(filename)});
      fs.createReadStream(filename, {'flags': 'r', 'encoding': 'binary', 'mode': 0666})
        .addListener('data', function(chunk) { response.write(chunk, 'binary'); })
        .addListener('close', function() { response.end(); });
    }
    return;
  });
});

server.listen(3000);