// file that contains the 
// actual functionality of the blog post
// ie what drives the code forward

// get a temp arrray to act as
// a database of posts
let databaseOfPosts = []

// create a fake pid (post ID)
// for each blog post
// and will be incremented 
let pid = 0



// function that creates a new post
const create = (req, res) => {
    // get title, author, and text of blog
    // from req parameter body
    const title = req.body.title

    // get author
    const author = req.body.author

    // get text of body of blog
    const text = req.body.text

    // create a new blog post entity
    // to be passed into our
    // array of blogs
    const newBlog = {
        // get post ID into
        // our new entity id
        // field
        id: pid,
        // same with title
        title: title,
        // same with author
        author: author,
        // same with text of the body
        content: text,
        // and get the creation date 
        // of the blog post
        time: new Date().toISOString()
    }
    pid++
    // add new blog post into our array
    databaseOfPosts.push(newBlog)

    return newBlog
}


// function that updates
// an exisiting post 
// by ID 
const update = (req, res) =>{
    // get id
    const id = req.params.id
    // get similar information as create
    // function
    const title = req.body.title

    // get author
    const author = req.body.author

    // get text of body of blog
    const text = req.body.content

    // find post with matching ID 
    // in the array of posts
    const current = databaseOfPosts.find((p) => p.id === parseInt(id))

    // if post was found in database
    if (current)
    {
        // update the current post
        // with the edited data
        current.title = title
        current.content = text
        current.author = author

        // and respond with updated blog post
        // data
        res.json(current)

    }

    // else send an error
    // that the current post
    // is non existent in our database
    else{res.status(404).json({error: 'Could not find your post!'})}
}

// similar logic to deleting a post
// we use its ID 
// and delete it based on that
const deleted = (req,res) =>{
    // get ID as an int form
    const id = parseInt(req.params.id)

    // get length of current array of posts
    // to see if it matches after our filter search
    // for removal of the post
    const length = databaseOfPosts.length

    // filter array to remove
    // post with specified ID
    databaseOfPosts = databaseOfPosts.filter((post)=>post.id != id)

    // and if its succesful
    // we send a 204 to show it was succesful
    if (databaseOfPosts.length < length)
    { 
        // if theyre not the same length
        // it was a success!
        res.status(204).send()
    }

    // else we couldnt find any
    // post that matched with that id post
    else{res.status(404).json({error: 'Could not find your post!'})}
}

// export functions so they can be used in our other files
module.exports = {
    create,update,deleted
}