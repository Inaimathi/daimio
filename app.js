var app = require('http').createServer(handler)
  , fs = require('fs')
  , static = require('node-static')
  , qs = require('querystring')
  , io = require('socket.io').listen(app, { log: false })
  , mongo = require('mongodb')
  , db = new mongo.Db('daimio', new mongo.Server('localhost', 27017, {auto_reconnect: true}), {w: 0});

// io.set('log level', 0)
    
var DAML = require('daml')
DAML.db = db
DAML.mongo = mongo


var fileServer = new(static.Server)('./public')
// var html = fs.readFileSync(__dirname+'/public/index.html.js', 'utf8')

var html = fs.readFileSync(__dirname+'/button.html', 'utf8')

var onerror = function(err) {
  return console.log(err)
};

// Configure our HTTP server 
function handler (req, res) {
  if(/public\//.test(req.url)) { // public files
    fileServer.serve(req, res);
    res.end();
    return;
  }
  
  if(req.url === '/favicon.ico') { // favicon
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  
  if(req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
      if(body.length > 1e6) req.connection.destroy();
    })
    
    req.on('end', function () {
      var POST = qs.parse(body); // no multipart forms // POST["node[name]"]

      // HEY!! just bounce only bounce check header for ME
      // then do like the DMG thing


      global.output = [];
      
      // if(POST.daml) {
        // this_html += DAML.run(POST.daml);
        // TODO: allow text through here, not just json
      // } 
      
      res.writeHead(200, {"Content-Type": "application/json"});

      // DAML.add_global('POST', POST);
      DAML.run(POST.daml, function(value) {
        res.end(JSON.stringify(global.output));
      });
      
    });
    return;
  }
  
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(html);
}


db.open(function(err, db) {
  if(err) return onerror('DB refused to open: ', err);

  // console.log('connected!'); 
  
  app.listen(8008);
  
  // io.on('connection', function (socket) {
  //   socket.on('bounce', function (data) {
  //     io.sockets.emit('bounced', data)
  //     console.log(['bouncing', data])
  //   })
  // })
  
});


io.on('connection', function (socket) {
  
  socket.on('process', function (data) {
    if(!data.daml) 
      return false
    
    DAML.run(data.daml, function(value) { // TODO: add 'context' for run
      io.sockets.emit('return', value) // TODO: return just to asker [maybe use jDaimio for this?]
    })
  })

  socket.on('bounce', function (data) {
    io.sockets.emit('bounced', data)
    // console.log(['bouncing', data])
  })
  
})