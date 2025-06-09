import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { HtmlToText50 } from "./HtmlToText";
import { Link } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function Post({post={ id:-1, title:"This is default post title", content:"This is default post content" }, deletePost}) {

    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser())
        setLogin(isLoggedIn)
    }, [])

    return(

        <Card className="border-1 shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <div className="card-text">
                    <HtmlToText50 htmlContent={post.content} />...
                </div>

                {/* <CardText dangerouslySetInnerHTML={{__html: post.content.substring(0, 100) + "..."}} /> */}

                <div className="mt-2">
                    <Link className="btn btn-secondary" to={'/post/'+post.id}>Read More</Link>

                    {userContextData.user.login && (user && user.id === post.user.id? <Button tag={Link} to={`/user/updateBlog/${post.id}`} className="btn btn-warning ms-2">Update</Button> : '')}
                    
                    {userContextData.user.login && (user && user.id === post.user.id? <Button onClick={() => deletePost(post)} className="btn btn-danger ms-2">Delete</Button> : '')}
                </div>
            </CardBody>
        </Card>

    )

}

export default Post;