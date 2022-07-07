const express = require('express');
const {PORT} =  require('./src/config/env');
const hbs = require('express-handlebars'); 
const routes = require('./routes.js');
const dbInit = require('./src/config/dbConfig');
const {auth} = require('./iddlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const app = express();


app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'));
app.use(auth)
app.use(routes);
dbInit();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))