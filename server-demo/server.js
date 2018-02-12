let Bundler = require('parcel-bundler');
let express = require('express');
let bundler = new Bundler('index.html');
let app = express();
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
// define proxy routes here
app.use(allowCrossDomain);
app.use(bundler.middleware());
app.listen(Number(process.env.PORT || 1234))