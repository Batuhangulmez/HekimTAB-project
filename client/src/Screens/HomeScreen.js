import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'
import { fetchPost } from '../axiox/index.js'

import { Spinner, Row, Col } from 'react-bootstrap'

const HomeScreen = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const { data } = await fetchPost()
            console.log(data);
            setPosts(data);
        }
        getPosts()
    }, [])


    return (
        <>
            <h1>En güncel anılar</h1>
            {!posts.length ? (
                <Spinner animation='border' />
            ) : (
                <Row>
                    {posts.map((post) => (
                        <Col
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                            className='m-auto'
                            key={post._id}
                        >
                            <Post post={post} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen