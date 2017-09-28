require('dotenv').config()

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require("socket.io");
const http = require('http')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const session = require('express-session')
const massive = require('massive')
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

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true

}).then(function(db){
    app.set('db',db)
  })


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
    successRedirect: 'http://localhost:3000/Home',
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
//////================USER CREDENTIAL ENDPOINTS++++++++++++++++//////
app.get('/user', (req,res)=>{
      console.log('USER ENDPOINT' + req.user)
      res.status(200).json(req.user)
  })
app.post('/user', (req,res) =>{
    console.log("tester:" + req.body.email)
    req.app.get('db').createUser([req.body.email]).then(response =>{
        res.status(200).send(console.log('success'))
    })
})

app.get('/allUsers', (req,res)=>{
    req.app.get('db').getUsers().then(response =>{
        res.status(200).send(response)
    })

})


// REGULAR CRUD ENDPOINTS HERE
// app.get('endpoint', ctrl.function)
app.post('/quill', (req,res)=>{
    const { title, creator} = req.body
    req.app.get('db').createQuillDoc([title, creator]).then(response=>{
        res.status(200).send(console.log('We got it"'))
    })
})
app.post('/jsheets', (req,res)=>{
    const { title, creator} = req.body
    req.app.get('db').createSheetDoc([title, creator]).then(response=>{
        res.status(200).send(console.log('We did it"'))
    })
})

app.put('/update-username', (req, res) => {
    console.log(req.body);
    const { id, username } = req.body
    req.app.get('db').updateUsername([id, username]).then(response => {
        res.status(200).send(response);
    })
})






//Socket Stuff Down Here
let connections = [];
let roomId = {}

io.on('connection', socket => {
    console.log('socket connected')
    socket.name = socket.remoteAddress + ":" + socket.remotePort 
    connections.push(socket);

    socket.on('edited text', data => {
        console.log(data)
        socket.broadcast.emit("new text", data);
    })

    socket.on('dataOut', data => {
        console.log(data)
        socket.broadcast.emit('dataIn', data)
    })


//////////git status/////////////////////////////////////////////////////////////////



})

app.get('/auth/logout', (req,res,next) =>{
    req.logOut();
    res.status(200).redirect('http://localhost:3000')
})







//have the server listening just like normal
server.listen(3001, console.log('listening on 3001'))
