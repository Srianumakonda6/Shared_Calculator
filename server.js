var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

var history = []
io.on('connection', (socket) => {
    console.log('a user connected');
    if (history.length>0){
    io.emit('message to client', history);
    }
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message to server', (msg) => {
        history.push(msg)
        io.emit('message to client', history);
      });
});

const PORT = 3000;

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});