const express = require('express');
const fs = require('fs');  // Node's built-in file system module, used to read/write/delete files
const path = require('path');

const app = express();

// This take the incoming request data in json format and then parse it to the req.body object so that we can access the data through req.body in our route handlers.
app.use(express.json());

// handle the form data that is coming from the user side 
app.use(express.urlencoded({extended: true}));
// This line tells Express to serve static files from the 'public' directory. You can place your CSS, JavaScript, and image files in this directory, and they will be accessible to clients.
app.use(express.static(path.join(__dirname, 'public')));
// This line sets the view engine to EJS, which allows you to render dynamic HTML pages using EJS templates.
app.set('view engine', 'ejs');

// This Middleware function which is executed for every incoming request and then move to the next route handler through next() call 
app.use((req, res, next) => {
    console.log('This is a middleware function.');
    next();
});

// This route handler and inside error handling code which is used to show error if the directory is not found or any other error occurs while reading the directory and if there is no error then it will render the index.ejs file and pass the files array to the template.
app.get('/', (req, res) => {
    fs.readdir('./files', function(err, files) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading directory');
        }
        res.render("index", {files: files});
    });
});

// This is function is used to read the file and then render the show.ejs file and pass the title and content of the file to the template and handle the error if any error occurs while reading the file.
app.get('/read/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.render('show', {        
            title: filename.replace('.txt', ''), 
            content: data,
            filename: filename
        });
    });
});

app.get('/edit/:filename',(req,res)=>{
    res.render("edit",{filename: req.params.filename})
})


app.post('/edit', function(req, res) {
    fs.rename(                                         
        `./files/${req.body.previous}`,                
        `./files/${req.body.new}.txt`,                 
        function(error) {
            if (error) {
                console.error(error);
                return res.status(500).send('Error renaming file');
            }
            res.redirect("/");
        }
    );
});






// This route handler is used to create file and then write data in it 
app.post('/create', (req, res) => {
    // This line take the title from the request body split it to array and then convert it to string through the join 
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err) {
        if (err) { // an error handling code is also written incase if any error occurs while creating the file or writing data in it
            console.error(err);
            return res.status(500).send('Error creating file');
        }
        // if no error occurs it write the what ever in the textarea and return the user to the / route which is the main route here
        res.redirect("/");
    });
});

// This route handler is used to read the file and then render the read.ejs file and pass the title and content of the file to the template and also handle the error if any error occurs while reading the file
app.get('/read/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.render('read', { 
            title: filename.replace('.txt', ''), 
            content: data,
            filename: filename
        });
    });
});

// This route handler is used to delete the file but there is no frontend in our project for it but it is written here for the concept that if you want 
// to delete the file then you can use this route handler in future project we will use this as well 
app.get('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.unlink(`./files/${filename}`, function(err) {
        if (err) {  // error handler for the delete operation 
            console.error(err);
            return res.status(500).send('Error deleting file');
        }
        // and if the deletion is successful then it will return the user to the main page which is the / route
        res.redirect("/");
    });
});

// listening to the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});