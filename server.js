const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var history = require('connect-history-api-fallback');
var app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(history());
const port = process.env.PORT || 8080;

app.listen(port);
