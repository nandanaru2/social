const _express = require("express");
const _bodyparser = require("body-parser");
const dotenv = require('dotenv').config();
// create express app
const app = _express();



app.use(_bodyparser.urlencoded({ limit: '10MB', extended: true }));
app.use(_bodyparser.json({ limit: '10MB' }));

console.log("Entered into server");

/*******set port *****/

var port = process.env.SERVER_PORT || 5050;

/******Access control****************/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,sessionid,email,multipart/form-data,application/x-www-form-urlencoded');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});






/*********Log the api******** */
const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return console.error.bind(console)
    }
    if (statusCode >= 400) {
        return console.warn.bind(console)
    }

    return console.log.bind(console)
}

const logRequestStart = (req, res, next) => {

    const cleanup = () => {
        res.removeListener('finish', logFn)
        res.removeListener('close', abortFn)
        res.removeListener('error', errorFn)
    }

    const logFn = () => {
        cleanup()
        const logger = getLoggerForStatusCode(res.statusCode)
        logger(`${req.method} ${req.originalUrl}  ${res.statusCode} ${res.statusMessage};`)
    }

    const abortFn = () => {
        cleanup()
        console.warn('Request aborted by the client')
    }

    const errorFn = err => {
        cleanup()
        console.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error

    next()
}

app.use(logRequestStart)
app.disable('etag');


/************End log ******************* */




require('./routes/git')(app);



app.listen(port, function () {
    console.log("Server is Listening on Port : " + port);

})

app.use(function (err, req, res, next) {
    res.status(400).send(err)
})

//https.createServer({},app).listen(443);
console.log('Server Started : ' + port);




