import express from 'express'

const app = express()

app.set("view engine","ejs")

// function to get request and response

app.get('/',(req,res) => {
    res.render("index",{name: "Abubakar Orakzai"})
})

app.get('/contact',(req,res) => {
    res.render("contact")
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})