// get express from library
const express = require('express')
// get cross origin requests from library
const crossorigin= require('cors')
// get app variable by calling express
const app = express()
// set port number 
const PORT = 5000

// database of posts
let posts = []
let pid = 0

// for cross origin requests
app.use(crossorigin())

// for JSON data
app.use(express.json())
// get functions we created earlier for
// usage
const { create, update, deleted } = require('./handle') 


// ROUTES FOR BLOG FUNCTIONALITY OF THE APP BELOW

// get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts) 
})

// create a new post
app.post('/api/posts', (req, res) => {
    const newPost = { id: pid, title: req.body.title, content: req.body.content, author: req.body.author }
    posts.push(newPost)  
    pid++  
    res.status(201).json(newPost) 
})

// update a blog post by ID
app.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find(p => p.id === id)  
    if (post) {
        post.title = req.body.title || post.title
        post.content = req.body.content || post.content
        post.author = req.body.author || post.author
        res.json(post)  
    } else {
        res.status(404).json({ error: 'Post not found' })
    }
})

// delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newPosts = posts.filter(post => post.id !== id)
    if (newPosts.length !== posts.length) {
        posts = newPosts  
        res.status(204).send()  
    } else {
        res.status(404).json({ error: 'Post not found' })
    }
})

// Start the server
app.listen(PORT)
console.log('Server is lisetening on port 5000')
