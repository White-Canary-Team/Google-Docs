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
const path = require('path')

const myIp = 'localhost';

// make sure you import the things apove ^
const app = express();
var server = http.createServer(app)
const io = socketIo(server);

app.use(express.static(__dirname + '/googledoc/build'))
app.use(cors())
app.use(bodyParser.json())


//Express Session Set Up
app.use(session({
    secret: 'alexcharliechrisruston',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
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

}).then(function (db) {
    app.set('db', db)
})


passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile)
}))
//Auth Endpoints///
app.get('/test', (req, res) => { console.log('testing') })

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {

    successRedirect: `http://${myIp}:3000/Home`,
    failureRedirect: `http://${myIp}:3000`

}))
passport.serializeUser(function (user, done) {
    // console.log( "serializing--->" ,user)
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    // console.log("deSerializing ===>" ,user)
    done(null, user)
})
app.get('/auth/me', (req, res, next) => {
    if (!req.user) {
        return res.status(404).send("user not found")
    } else {
        res.status(200).send(req.user)

    }
})
//////================USER CREDENTIAL ENDPOINTS++++++++++++++++//////
app.get('/user', (req, res) => {
    console.log('USER ENDPOINT' + req.user)
    res.status(200).json(req.user)
})
app.post('/user', (req, res) => {
    console.log("tester:" + req.body.email)
    req.app.get('db').createUser([req.body.email]).then(response => {
        res.status(200).send(console.log('success'))
    })
})

app.get('/allUsers', (req, res) => {
    req.app.get('db').getUsers().then(response => {
        res.status(200).send(response)
    })

})


// REGULAR CRUD ENDPOINTS HERE
// app.get('endpoint', ctrl.function)
app.get('/documents', (req, res) => {
    req.app.get('db').getAllDocs().then(response => {
        res.status(200).send(response)
    })
})


app.post('/quill', (req, res) => {
    const { title, creator, doctype, editors } = req.body
    req.app.get('db').createQuillDoc([title, creator, doctype, editors]).then(response => {
        res.status(200).send(console.log('We got it"'))
    })
})
app.post('/quillTitle', (req,res) =>{
    const {title,editors,id} = req.body
    req.app.get('db').quillTitle([title,editors,id]).then(response =>{
        res.status(200).send(console.log("I added a quill title"))
    })
})
app.post('/jsheets', (req, res) => {
    const { title, creator, doctype, body, styles, editors } = req.body
    req.app.get('db').createSheetDoc([title, creator, doctype, body, styles, editors]).then(response => {
        res.status(200).send(console.log('We did it"'))
    })
})

app.put('/update-username', (req, res) => {
    const { id, username } = req.body
    req.app.get('db').updateUsername([id, username]).then(response => {
        res.status(200).send(response);
    })
})

app.get('/getDocumentById/:id', (req, res) => {
    req.app.get('db').docById([req.params.id]).then(response => {
        res.status(200).send(response);
    })
})

app.get('/getSheetById/:id', (req, res) => {
    req.app.get('db').SheetById([req.params.id]).then(response => {
        res.status(200).send(response);
    })
})






//Socket Stuff Down Here
let connections = [];
let roomid = {}


io.on('connection', socket => {
    console.log('socket connected')
    socket.name = socket.remoteAddress + ":" + socket.remotePort
    connections.push(socket);

    socket.on('room', data => {
        socket.join(data.id);
        roomid[data.id] = {};
        docId = data.id
        console.log(`joined room ${data.id}`)
    })

    socket.on('leave room', data => {

        socket.leave(data)
        delete roomid[data]
        console.log('TERMINATED ROOM')
        console.log(roomid, 'spliced roomid')
    })

    socket.on('edited text', data => {
        if (roomid.hasOwnProperty(data.id)) {
            socket.broadcast.to(data.id).emit("new text", data.value)

        } else return null
    })
    app.put('/save-test', (req, res) => {
        const { id, value } = req.body
        req.app.get('db').autoSave([value, id]).then(response =>{res.status(200).send(response)})
    })

    app.put('/save-sheet', (req, res) => {
        let { id, table, styles } = req.body;
        table = JSON.stringify(table);
        styles = JSON.stringify(styles);
        req.app.get('db').autoSaveSheets([table, styles, id]).then(response =>{res.status(200).send(response)})
    })


    socket.on('dataOut', data => {
        console.log(data.id, 'test')
        if (roomid.hasOwnProperty(data.id)) {
        socket.broadcast.to(data.id).emit('dataIn', {table: data.table, styles: data.styles})
        }
    })

    socket.on('disconnect', function () {
        connections.splice(connections.indexOf(socket), 1);
    });

    //////////git status/////////////////////////////////////////////////////////////////



})

app.get('/auth/logout', (req, res, next) => {
    req.logOut();
    res.status(200).redirect('http://localhost:3000')
})


app.get('*', function (request, response){
 response.sendFile(path.join(__dirname, './googledoc/build/', 'index.html'))
})





//have the server listening just like normal
server.listen(3001, console.log('listening on 3001'))
