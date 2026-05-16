import express from 'express'

const app = express()


//  ====== Midleware ======

app.use((req,res,next) => {
    console.log('This is a middleware function.')
    next()
})
app.get('/', (req, res) => {
  res.render("index")
})


//  what ever the user in the brower req for will be store
//  in the req so that why we write req.paramss.username
//  inorder to display the username on the page.

app.get('/profile/:username', (req, res) => {
  res.send(`Hi This is ${req.params.username}`)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})