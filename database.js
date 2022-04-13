const mongoose = require('mongoose');

mongoose.connect(process.env.URI || 'mongodb://localhost:27017/glossarydb', (err) =>{
    if(err){
        console.log('ERROR TO CONNECT DB: ', err);
    }
    console.log('Database connected')
});