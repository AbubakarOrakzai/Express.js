const express = require('express');

const app = express();
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')    

app.use((req,res,next)=>{
    console.log('This is a middleware function.')
    next()
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 