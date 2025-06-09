import React, { useState, useEffect } from "react"
import { getAllPost, deletePostService } from "../services/post-service"
import { Col, Pagination, Row, PaginationItem, PaginationLink, Container } from "reactstrap"
import Post from "./Post"
import { toast } from "react-toastify"
import InfiniteScroll from "react-infinite-scroll-component"

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content:[],
        totalPages:1,
        totalElements:0,
        pageSize:5,
        lastPage:false,
        pageNumber:0
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        changePage(currentPage);
    }, [currentPage])

    const changePage = (pageNumber=0, pageSize=5) => {
        // getAllPost(pageNumber, pageSize).then((data) => {
        //     setPostContent(data)
        // }).catch((error) => {
        //     toast.error("Error in loading page")
        // })
        if (pageNumber < 0 || pageNumber >= postContent.totalPages) return;

        getAllPost(pageNumber+1, postContent.pageSize)
            .then((data) => {
                console.log("Data received:", data);
                setPostContent({
                    content: [...postContent.content, ...data.content] || [],
                    totalPages: data.totalPages || 1,
                    totalElements: data.totalElements || 0,
                    pageSize: data.pageSize || 5,
                    lastPage: data.lastPage || false,
                    pageNumber: pageNumber, // Keep 0-based index for API
                });
                // window.scroll(0, 0)
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Error in loading posts");
            });
    }

    function deletePost(post) {
        deletePostService(post.id).then((data) => {
            console.log(data);
            toast.success("Post successfully deleted !!")

            let newPostContents= postContent.content.filter(p => p.id != post.id)
            setPostContent({...postContent, content:newPostContents})

        }).catch((error) => {
            console.log(error);
            toast.error("Error in deleting post !! ")
        })
    }

    const changePageInfinite =() =>{
        console.log("Page Changed");
        setCurrentPage(currentPage+1)
    }

    return (

        <div className="container-fluid">

            <Row>
                <Col md={{ size:12 }}>

                    <h1>Blogs Count: ({postContent?.totalElements})</h1>

                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={postContent.lastPage === false}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have reached the end of the content!</b>
                            </p>
                        }
                    >
                        {
                            postContent?.content.map((post) => (
                                <Post key={post.id} post={post} deletePost={deletePost} />
                            ))
                        }
                    </InfiniteScroll>

                    {/* <Container className="mt-3">
                        <Pagination size="lg">
                            <PaginationItem disabled={ postContent.pageNumber == 0 } onClick={()=>changePage(postContent.pageNumber-1)} >
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => {
                                    return (
                                        <PaginationItem onClick={()=>changePage(index)} 
                                            active={index == postContent.pageNumber} 
                                            key={index}>
                                            <PaginationLink>
                                                {index+1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })
                            }

                            <PaginationItem disabled={ postContent.lastPage } onClick={()=>changePage(postContent.pageNumber+1)} >
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}

                </Col>
            </Row>
            
        </div>

    )
}

export default NewFeed