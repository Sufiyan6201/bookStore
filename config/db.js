const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDataBS');
const db =mongoose.connection;
db.on('connected',(err)=>{
     if(!err){
          console.log('DataBS connected');
     }
});
module.exports=db;