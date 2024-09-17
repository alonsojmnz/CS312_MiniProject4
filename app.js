// get express from library
const express = require('express')
// get app variable by calling express
const app = express()
// set port number 
const PORT = 5000

// set up EJS in express app.js
app.set('view engine', 'ejs')
// middleware to parse form data
app.use(express.urlencoded({ extended: true }))

// routes for basic functionality of the app BELOW
//////////////////////////////////////////////////////////////////////////
//
// render page full of all blog posts
app.get('/home', (req, res) => {
    res.render('home', {posts : arrPosts})
})
//
// render page for posting a new blog post
app.get('/new', (req, res) => {
    res.render('new')
})
//
// handle new submissions of the form
// create a temporary array to store blog posts
let arrPosts = []
app.post('/new', (req, res) => {
    const newFirstName = req.body.firstname
    const newLastName = req.body.lastname
    const newContent = req.body.content
    const newTitle = req.body.blogtitle
    const structOfInfo = {
        "firstname": newFirstName,
        "lastname": newLastName,
        "content": newContent,
        "title": newTitle,
        "createdAt": new Date().toISOString()
    }
    arrPosts.push(structOfInfo)
    res.redirect('/view/:0')
})
//
//
// render the new blog posts posted into the 
// post array
app.get('/view/:id', (req, res) => {
    res.render('view', { posts: arrPosts }) 
})
//
//
// handle deletion of a blog post
app.post('/delete/:id', (req,res) => {
    const post = arrPosts[postIndex];
    const toBeRemoved = req.params.id
    arrPosts.splice(toBeRemoved, 1)
    res.redirect('/view/:0')
})
//
//
//
//
// Start the server
app.listen(PORT)
console.log('Server is lisetening on port 5000')
//
//
//
//
//
//
//
//
//
//
//
//////////////////////////////////////////////////////////////////////////