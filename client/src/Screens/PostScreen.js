import React, { useState } from 'react'

import ReactFileBase64 from 'react-file-base64'

import { Container } from 'react-bootstrap'

import * as api from '../axiox/index.js'

const PostScreen = () => {

    const [postData, setPostData] = useState({
        category: '',
        content: '',
        image: ''
    })
    return (
        <Container className='container'>
            <main>
                <form className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        api.createPost(postData)
                    }}
                >
                    <h2 >Vaka paylaş</h2>
                    <label >
                        <div > Kategori</div>
                        <input required
                            type="text"
                            placeholder="Kategori yaz"
                            name="category"
                            onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                        />
                    </label>

                    <label >
                        <div >İçerik</div>
                        <textarea
                            type="text"
                            placeholder="..."
                            name="content"
                            rows="3"
                            onChange={(e) => setPostData({ ...postData, content: e.target.value })}

                        />
                    </label>

                    <ReactFileBase64 type='file' multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, image: base64 }) }} />

                    <input type="Submit" value="Paylaş" />
                </form>
            </main>
        </Container>
    )
}

export default PostScreen