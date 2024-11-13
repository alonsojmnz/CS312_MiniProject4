// Import necessary libraries
import React, { useState, useEffect } from 'react'
import axios from 'axios' 

// main component
function App() {
    // state for the current post being created or edited
    const postUseState = useState({ title: '', content: '', author: '' })
    // state for current post data
    const currPost = postUseState[0]
    // update current post data
    const setCurr = postUseState[1]


    // state to indicate if we are editing an existing post
    const editUseState = useState(false)
    // state for currently edited post data
    const curEdit = editUseState[0]
    // update edit post with updated things
    const setEdit = editUseState[1]

    // state that can store all blog posts
    const stateUseState = useState([])
    // update posts state
    const setPost = stateUseState[1]
    // state that stores the current value
    // of all posts
    const posts = stateUseState[0]




    // Load posts from server when the component mounts
    useEffect(function () {
        loadPosts()
    }, [])

    // function to load all posts from the server
    function loadPosts() {
        // GET request to fetch posts
        axios.get('/api/posts')
            .then(function (response) {
                // Set posts state with data from the server
                setPost(response.data)
            })
            .catch(function (error) {
                // Log any errors
                console.error('Error fetching posts:', error)
            })
    }

    // function to handle saving a post 
    function savePost(event) {
        if (curEdit) {
            // update existing post
            axios.put('/api/posts/' + currPost.id, currPost)
                .then(function (response) {
                    // map over posts and update the edited post
                    const updatedPosts = posts.map(function (post) {
                        if (post.id === currPost.id) {
                            return response.data
                        } else {
                            return post
                        }
                    })
                    // update posts in state
                    setPost(updatedPosts)
                    // and clear form and reset editing state
                    resetForm()
                })
                .catch(function (error) {
                    // log any errors
                    console.error('Error updating post:', error)
                })
        } else {
            // create a new post if 
            // we are saving a post new post
            // and not editing it
            axios.post('/api/posts', currPost)
                .then(function (response) {
                    // add the new post to posts
                    const newPosts = posts.concat(response.data)
                    // update posts in state
                    setPost(newPosts)
                    // clear form
                    resetForm()
                })
                .catch(function (error) {
                    // yeah just log any errors
                    console.error('Error creating post:', error)
                })
        }
    }

    // function to prepare a post for editing
    function editPost(post) {
        // set current post in form fields
        setCurr(post)
        // if we are editing a post we 
        // enteer the function to update the
        // editing post and do so
        setEdit(true)
    }

    // function to delete a post by ID
    function deletePost(id) {
        // DELETE request for the specified post ID
        axios.delete('/api/posts/' + id)
            .then(function () {
                // filter out the deleted post from the list
                const remainingPosts = posts.filter(function (post) {
                    return post.id !== id
                })
                // update posts in state
                setPost(remainingPosts)
            })
            .catch(function (error) {
                // log any errors
                console.error('Error deleting post:', error)
            })
    }

    // reset form fields and exit editing mode
    function resetForm() {
        // clear form fields
        setCurr({ title: '', content: '', author: '' })
        // exit editing mode
        setEdit(false)
    }

    return (
        <div>
            <h1>Blog</h1>

            <form onSubmit={savePost}>
                
          
                <input
                    placeholder="Title"
                    value={currPost.title}
                    onChange={function (event) {
                        // update current post title
                        const updatedPost = {
                            title: event.target.value,
                            content: currPost.content,
                            author: currPost.author
                        }
                        setCurr(updatedPost)
                    }}
                    required
                />

                <textarea
                    placeholder="Content"
                    value={currPost.content}
                    onChange={function (event) {
                        // update current post content
                        const updatedPost = {
                            title: currPost.title,
                            content: event.target.value,
                            author: currPost.author
                        }
                        setCurr(updatedPost)
                    }}
                    required
                />

                <input
                    placeholder="Author"
                    value={currPost.author}
                    onChange={function (event) {
                        // update current post author
                        const updatedPost = {
                            title: currPost.title,
                            content: currPost.content,
                            author: event.target.value
                        }
                        setCurr(updatedPost)
                    }}
                    required
                />

                <button type="submit">{curEdit ? 'Update' : 'Save'}</button>
            </form>


            <div>
                {posts.map(function (post) {
                    return (
                        <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p><strong>{post.author}</strong></p>
                            <button onClick={function () { editPost(post) }}>Edit</button>
                            <button onClick={function () { deletePost(post.id) }}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App
