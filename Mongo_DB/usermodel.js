const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')

const userSchema = mongoose.Schema({
      name:string,
      username:string,
      email:string
})

module.exports=mongoose.model("user",userSchema)