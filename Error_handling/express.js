const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('This is a middleware function.');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/profile',(req,res,next)=>{
     return next(new Error('This is an error message.'))
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong! ' + err.message);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); 