const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require("socket.io");
const http = require('http')
// make sure you import the things apove ^
const app = express();
var server = http.createServer(app)
const io = socketIo(server);

// REGULAR CRUD ENDPOINTS HERE
// app.get('endpoint', ctrl.function)







//Socket Stuff Down Here
let connections = [];
let roomId = {}

io.on('connection', socket => {
    console.log('socket connected')
    connections.push(socket);

///////////////////////// JOIN ROOMS FOR LIVE EDITING ////////////////////////////////////
    // socket.on('room', data => {
    //     socket.join(data.id);
    //     roomid[data.id] = {}
    //     console.log(`joined room ${data.id}`)
    //     console.log(roomid, 'room array')
    // })

    
//     socket.on('leave room', data => {
//         socket.leave(data)
//         delete roomid[data]
//         console.log('TERMINATED ROOM')
//         console.log(roomid, 'spliced roomid')
//     })

/////////////////////////////////////////////////////////////////////



})






//have the server listening just like normal
server.listen(3001, console.log('listening on 3001'))
