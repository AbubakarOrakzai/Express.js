const express=require('express')
const app=express()

const Authenication = function(req,res,next){
      console.log("you are now inside in the Authenication Middleware")

      req.user={userId:1,role:"student"}

      if(req.user)
        {
            next()
      }
      else{
        res.json({
            success:false,
            message:"Not a valid user",
        })
      }
}

const isStudent = function(req,res,next){
    console.log("I am student")

    if(req.user.role === "student"){
        next()
    }
    else{
        res.json({
              success:false,
              message:"Not a valide user",
        })
    }
}

const isAdmin = function(req,res,next){
    console.log("I am Admin")

    if(req.user.role === "Admin")
    {
        next()
    }
    else({
          success:false,
          message:"Not a valid student",
    })
}

app.get("/student",Authenication,isStudent,(req,res)=>{
    res.send("student dashboard")
})

app.get("/Admin",Authenication,isAdmin,(req,res)=>{
    res.send("Admin dashboard")
})