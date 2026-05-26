const express = require('express')
const path = require('path')  
const mongoose = require('mongoose')
const app = express()
const userModel = require('./models/user')

mongoose.connect('mongodb://127.0.0.1:27018/testapp1')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/read', async (req, res) => {
    let allusers = await userModel.find();
    res.render('read', { users: allusers })
})

app.post('/create', async (req, res) => {
    let { name, email, Imgurl } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image: Imgurl,
    })
    res.redirect('/read');
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})