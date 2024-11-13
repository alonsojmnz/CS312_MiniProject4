import React, { useState, useEffect } from 'react'

// postBlog component for creating or editing blog posts
const PostBlog = ({ onSave, initialData }) => {
    // state vars for author input 
    // initialize state for the author
    // with an empty string
    const post_author_state = useState('')
    // function that updates post author
    const set_post_author = post_author_state[1]
    // get current value of author 
    const post_author = post_author_state[0]


    // state vars for text input 
    // initialize state of body of text
    // with an empty string
    const post_text_state = useState('')
    // function that updates body of text
    const set_post_text = post_text_state[1]
    // get current value of body of text
    const post_text = post_text_state[0]


    // state vars for title input 
    // you get the same idea here lmao
    const post_title_state = useState('')
    const post_title = post_title_state[0]
    const set_post_title = post_title_state[1]


    // load initial data into the fields
    // of the form 
    // if we are editiing an exisitng post
    useEffect(() => 
    {
        if (initialData) {
            // set author and body of text
            // from initial data passed in 
            // or to empty
            set_post_text(initialData.content || '')
            set_post_author(initialData.author || '')
            // set title from initial data passed in
            // or empty
            set_post_title(initialData.title || '')
    }}, [initialData])

    // handle form submission event
    const handle_form_submit = (submit_event) => {
        // prevent default form submission behavior
        submit_event.preventDefault()
        // and then on save
        // we update the blog post
        // with the author title content and id if
        // we are updating an exisiting post
        // with the state of all 3 
        onSave({
            id: initialData?.id, author: post_author, 
            title: post_title, content: post_text
        })
    }

    // render the form with input fields and a submit button
    return (
        <form onSubmit={handle_form_submit}>
            
            <input
                placeholder="Title"
                value={post_title}
                onChange={(input_event) => set_post_title(input_event.target.value)}
                required
            />

            <textarea
                placeholder="Content"
                value={post_text}
                onChange={(input_event) => set_post_text(input_event.target.value)}
                required
            />

            <input
                placeholder="Author"
                value={post_author}
                onChange={(input_event) => set_post_author(input_event.target.value)}
                required
            />

            {/* Submit button */}
            <button type="submit">Save</button>
        </form>
    )
}

export default PostBlog
