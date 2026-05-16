## This repo will contain all the concept related to Express.js

---

### Basic_express_js
- How to create middleware and how to use it
- Dynamic routing

### EJS
- Template engine EJS
- How to setup and run the webpage through EJS

### Static file
- Creating different folders in public for HTML, CSS and JavaScript
- How to connect your HTML, CSS and JavaScript files

### Error handling
- Contains code which deals with error handling

### Mini_Project
- Mini project contains all the above concepts

---

## Note Taking App — Node.js & Express

A simple task manager app that lets users create and read tasks.

### How it works
- The frontend contains a form where the user writes a task title and details
- On submission, the backend creates a `.txt` file named after the title and writes the details inside it
- All tasks are displayed on the home page and can be opened to read their content

### Tech used
- Node.js — runtime environment
- Express.js — handles routing and middleware
- EJS — renders dynamic HTML templates
- fs module — handles file read/write/delete operations

### Project structure
- `app.js` — the main backend file, contains all routes and middleware
- `views/` — contains EJS templates for the home and read pages
- `public/` — contains static files (CSS, etc.)
- `files/` — where all task `.txt` files are stored