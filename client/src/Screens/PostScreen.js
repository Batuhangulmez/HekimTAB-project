import React from 'react'

import ReactFileBase64 from 'react-file-base64'

import { Container } from 'react-bootstrap'

const PostScreen = () => {
    return (
        <Container className='container'>
            <main>
                <form className="form"
                    onSubmit={(e) => {
                        e.preventDefault();


                    }}
                >
                    <h2 >Vaka paylaş</h2>
                    <label >
                        <div > Kategori</div>
                        <input required
                            type="text"
                            placeholder="Kategori yaz"
                            name="category"
                        />
                    </label>

                    <label >
                        <div >İçerik</div>
                        <textarea
                            type="text"
                            placeholder="..."
                            name="content"
                            rows="3"
                        />
                    </label>

                    <ReactFileBase64 type='file' multiple={false} onDone={() => { }} />

                    <input type="Submit" value="Paylaş" />
                </form>
            </main>
        </Container>
    )
}

export default PostScreen