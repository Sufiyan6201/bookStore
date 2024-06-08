const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
     name:String,
     authorName:String,
     image:{
          type:String,
          required:true
     },
     dsc:String

})
const user=mongoose.model('userTbls',userSchema);
module.exports=user;