const express = require("express")
const app = express()
const axios = require("axios")

app.get("/profile/:id",async(req,res,next)=>{
            try{ 
                let {id} = req.params;
                let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`) 


                if(!response.data || !response.data.id)
                {
                       throw new Error("Invalid post")
                }
                res.json({
                    title:response.data.title,
                    body:response.data.body,
                })
            }
                catch(error)
                {
                    next(error)
                }
            
});

app.use((error,req,res,next)=>{
          res.status(500).send(error.message)
});

app.listen(9000,(req,res)=>{
    console.log("The server is runing on port 9000")
})