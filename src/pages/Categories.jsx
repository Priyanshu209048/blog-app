import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadAllPostByCategory, deletePostService } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {

    const {categoryId} = useParams()

    const [posts, setPosts] =  useState([])

    useEffect(() => {
        console.log(categoryId)
        loadAllPostByCategory(categoryId).then(data => {
            setPosts([...data.content])
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading category wise post")
        })
    } ,[categoryId])

    function deletePost(post) {
        deletePostService(post.id).then((data) => {
            console.log(data);
            toast.success("Post successfully deleted !!")

            let newPostContents= posts.filter(p => p.id != post.id)
            setPosts([...newPostContents])

        }).catch((error) => {
            console.log(error);
            toast.error("Error in deleting post !! ")
        })
    }

  return (
    <Base>
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">
                    <CategorySideMenu />
                </Col>
                <Col md={10}>
                    <h1>Blogs Count ( {posts.length} )</h1>
                    {
                        posts && posts.map((post, index) => {
                            return(
                                <Post key={index} post={post} deletePost={deletePost} />
                            )
                        })
                    }
                    {
                        posts.length <= 0 ? <h1>No post in this category</h1> : ''
                    }
                </Col>
            </Row>
        </Container>
    </Base>
  )
}

export default Categories