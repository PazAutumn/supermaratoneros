"use strict"
const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const app = express();
const port = (process.env.PORT || 4200);
const host = (process.env.ROOTPATH || 'localhost:' + port);
app.use(
    helmet({ 
        frameguard: { 
            action: 'deny' 
        } 
    }))
    .use(helmet.xssFilter())
    .use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            imgSrc: ["'self' data:"],
            connectSrc: ["'self'", host],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'"]
        }
    }))
    .use(helmet.noCache())
    .use('/apps/supermaratoneros', express.static(path.join(__dirname, '/dist')))

app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/dist/index.html`)
})

const server = http.createServer(app);
server.listen(port, (err) => {
    if (err) {
        throw err
    }
    console.log('From Server: App iniciada exitósamente y corriendo en puerto: ' + port)
})