require('dotenv').config()

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require("socket.io");
const http = require('http')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const session = require('express-session')
// make sure you import the things apove ^
const app = express();
var server = http.createServer(app)
const io = socketIo(server);


app.use(cors())
app.use(bodyParser.json())

//Express Session Set Up
app.use(session({
    secret: 'alexcharliechrisruston',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(passport.initialize())
app.use(passport.session())


passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done){
    return done(null,profile)
}))
//Auth Endpoints///
app.get('/test', (req, res)=>{console.log('testing')})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/',
    failureRedirect:'http://localhost:3000/'
}))
passport.serializeUser(function(user, done) {
    console.log( "serializing--->" ,user)
    done(null,user);
  });
passport.deserializeUser(function(user,done){
    console.log("deSerializing ===>" ,user)
    done(null,user)
})
app.get('/auth/me', (req, res,next) =>{
    if(!req.user){
        return res.status(404).send("user not found")
    } else{
        console.log(req.user)
        res.status(200).send(req.user)

    }
})

// REGULAR CRUD ENDPOINTS HERE
// app.get('endpoint', ctrl.function)







//Socket Stuff Down Here
let connections = [];
let roomId = {}

io.on('connection', socket => {
    console.log('socket connected')
    socket.name = socket.remoteAddress + ":" + socket.remotePort 
    connections.push(socket);

    socket.on('test', data => {
        console.log(data)
        socket.broadcast.emit("test2", data);
    })

/////////////////////////////////////////////////////////////////////



})






//have the server listening just like normal
server.listen(3001, console.log('listening on 3001'))
