import { Link, useParams } from "react-router-dom"
import Base from "../components/Base"
import { Container, Row, Col, Card, CardBody, CardText, Input, Button } from "reactstrap"
import { useEffect, useState } from "react"
import { createComment, getPost } from "../services/post-service"
import { toast } from "react-toastify"
import { BASE_URL } from "../services/helper"
import { HtmlToText } from "../components/HtmlToText"
import { isLoggedIn } from "../auth"

const PostPage = () =>{

    const {postId} = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        content:''
    })

    useEffect(() => {
        // Load post of postId
        getPost(postId).then((data) => {
            console.log(data);
            setPost(data)
        }).catch((error) => {
            console.log(error);
            toast.error("Error while fetching post")
        })
    }, [postId])

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleDateString()
    }

    const resetData = () => {
        setComment({
            content: ''
        })
    }

    const submitPost = () =>{
        if (!isLoggedIn()){
            toast.error("Please login to comment")
            return
        }
        if (comment.content.trim() === '') {
            return
        }
        createComment(comment, post.id).then((data) => {
            console.log(data);
            toast.success("Comment Added...")
            setPost({
                ...post,
                comments: [...post.comments, data.data]
            })
            resetData()
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Base>

            <Container className="mt-4">

                <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>)}

                <Row>
                    <Col md={{size: 12}}>

                        <Card className="mt-3 ps-2 shadow">
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText>
                                            Posted By <b>{ post.user.name }</b> on <b>{ printDate(post.addedDate) }</b> 
                                        </CardText>

                                        <CardText>
                                            <span className="text-muted">{post.category.categoryName}</span>
                                        </CardText>

                                        <div className="divider" style={{
                                            height: "1px",
                                            width: "100%",
                                            backgroundColor: "#e2e2e2",
                                        }}></div>

                                        <CardText className="mt-3">
                                            {/* <h1>{post.title}</h1> */}
                                        </CardText>
                                        <h1>{post.title}</h1>

                                        <div className="image-container container mt-3 shadow" style={{maxWidth:'50%'}}>
                                            <img className="img-fluid" src={ BASE_URL+'/posts/images/'+post.imageName } alt="Post Image" />
                                        </div>

                                        <div className="card-text mt-3">
                                            <HtmlToText htmlContent={post.content} />
                                        </div>
                                    </CardBody>
                                )
                            }
                        </Card>
                    
                    </Col>
                </Row>

                <Row className="my-4">
                    <Col md={{
                        size: 9,
                        offset: 1
                    }}>
                        <h3>Comments ({ post ? post.comments.length : 0 }) </h3>
                        {
                            post && post.comments.map((c, index)=>(
                                <Card className="mt-2 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }

                        <Card className="mt-3 border-0">
                            <CardBody>
                                <Input type="textarea" placeholder="Enter your comment here..." value={comment.content}
                                onChange={(event) => setComment({content:event.target.value})}/>
                                <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>

        </Base>
    )
}

export default PostPage