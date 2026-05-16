import express from 'express'

const app = express()

app.set("view engine","ejs")

app.use(express.static('./public')) // This line tells Express to serve static files from the 'public' directory. You can place your CSS, JavaScript, and image files in this directory, and they will be accessible to clients.

app.get('/', (req, res) => {
    res.render("index",{name: "Abubakar Orakzai"})
})  
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})