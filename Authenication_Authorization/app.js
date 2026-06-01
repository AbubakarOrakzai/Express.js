express = require('express')
app = express()

app.get('/',(req,res)=>{
       res.send("Welcom")
})

app.listen(3000,()=>{
    console.log("Sever is runing")
})