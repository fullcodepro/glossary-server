const mongoose = require('mongoose');

mongoose.connect(process.env.URI, (err) =>{
    if(err){
        console.log('ERROR TO CONNECT DB: ', err);
    }
    console.log('Database connected')
});