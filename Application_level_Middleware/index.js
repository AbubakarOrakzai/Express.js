const express = require('express')
const app = express()

const validationMiddleware = function(req,res,next){
    console.log("Validation done")
    next();
}

app.use(validationMiddleware);
const logginMiddleware = function(req,res,next){
    console.log("logging done")
    next()
}
app.use(logginMiddleware);


app.get('/',(req,res)=>{
    res.send("Hellow world");
})

app.listen(4000,(req,res)=>{
    console.log("Listing on port 4000")
})
