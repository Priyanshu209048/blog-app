import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from 'reactstrap'
import { getCurrentUser } from "../../auth";
import { deletePostService, loadAllPostByUser } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const UserDashboard = () => {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(getCurrentUser());
        setUser(getCurrentUser())

        loadPostData()
        
    }, [])

    function loadPostData() {
        loadAllPostByUser(getCurrentUser().id).then((data) => {
            console.log(data);
            setPosts([...data.content])
        }).catch((error) => {
            console.log(error);
            toast.error("Error in loading posts!! ")
        })
    }

    function deletePost(post) {
        deletePostService(post.id).then((data) => {
            console.log(data);
            toast.success("Post successfully deleted !!")
            // loadPostData()

            let newPosts = posts.filter(p => p.id != post.id)
            setPosts([...newPosts])

        }).catch((error) => {
            console.log(error);
            toast.error("Error in deleting post !! ")
        })
    }

    return (
        <Base>

        <Container>

            <AddPost />

            <h1 className="my-3">Post Count: ( {posts.length} )</h1>
            {
                posts.map((post, index) => {
                    return (
                        <Post key={index} post={post} deletePost={deletePost} />
                    )
                })
            }

        </Container>

        </Base>
    )
}

export default UserDashboard;