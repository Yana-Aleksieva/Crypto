const mongoose = require('mongoose');


module.exports =  () => {

    mongoose.connect('mongodb://localhost:27017/myapp');

    return  mongoose.connection.on('open', () => console.log('DB is connected'));
   
}