const express = require('express')
const mongoose = require('mongoose')
const route = require('./route');
const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost:27017/emp",{useNewUrlParser:true, useUnifiedTopology: true}).then(
    ()=>{

        const app = express();
        app.use(bodyParser.urlencoded({extended:true}));
        app.use('/api',route);
        app.listen(3000,()=>{
            console.log("Server Started");
        })
    }
)