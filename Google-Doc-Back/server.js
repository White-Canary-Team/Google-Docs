const express = require('express'),
      massive = require('massive'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      passport = require('passport');


let port = 3001;



const app  = express()
app.use(bodyParser.json())
app.use(cors())








app.listen(port, ()=>{
    console.log("I'm watching You on port:" + port)
})