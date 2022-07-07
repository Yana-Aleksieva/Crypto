const express = require('express');
const hbs = require('express-handlebars'); 

const app = express();

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('static'));
