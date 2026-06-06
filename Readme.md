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

## How it works
- The frontend contains a form where the user writes a task title and details
- On submission, the backend creates a `.txt` file named after the title and writes the details inside it
- All tasks are displayed on the home page and can be opened to read their content

## Tech used
- Node.js — runtime environment
- Express.js — handles routing and middleware
- EJS — renders dynamic HTML templates
- fs module — handles file read/write/delete operations

## Project structure
- `app.js` — the main backend file, contains all routes and middleware
- `views/` — contains EJS templates for the home and read pages
- `public/` — contains static files (CSS, etc.)
- `files/` — where all task `.txt` files are stored

### Mongo_DB 
- contain code for the connection of the database 
- script.js contain the route logic here
- usermodel.ejs conatin the connection to the database code 

### Mongo_Project 
- The project contain an add and delete and edit feature where use can add this data include name and email and the
- img url and that will be presented on the frontend of the website the
- script.js contain the logic for the route
- index.ejs Home page user can enter his information 
- read.ejs Read the data which is enter by the user and view and remove or update here 
=======
### Project structure
- `script.js` — the main backend file, contains all routes and middleware
- `views/` — contains EJS templates for the home and read pages
- `public/` — contains static files (CSS, etc.)
- `files/` — where all task `.txt` files are stored


### cookie
- how to setup an cookie
- Display the cookie on different route

### Bcrypt
- This project demonstrates the use of bcrypt in Node.js for secure password hashing and comparison. It includes
- examples of generating hashed passwords using salt rounds and verifying user passwords during authentication.
- The project helps understand how bcrypt improves security by preventing plain-text password storage in databases.

## JWT Authentication

- JWT (JSON Web Token) solves HTTP's stateless problem by storing user data (email, id) inside a signed token.
- After login, the token is stored in a cookie and sent with every request. 
- The server verifies the token using a secret key (never exposed to client) - no database lookups or repeated 
- passwords needed.

## Authenication_Authorization
- Secure authentication backend with bcrypt password hashing, JWT tokens, and cookie storage.
- Features include user registration, login/logout, and protected dashboard routes.

## Data_Association 
- Implement bidirectional data association between User and Post models using MongoDB
- references. This establishes a relationship where users can have multiple posts, and
- each post belongs to a single user.