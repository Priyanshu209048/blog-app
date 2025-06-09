import React, { useContext, useEffect, useState, useRef } from "react";
import { Card, CardBody, Form, Label, Input, Container, Button } from "reactstrap"
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import JoditEditor from "jodit-react";
import { getPost, updatePostService } from "../services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";

function UpdateBlog() {
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);

  useEffect(() => {
    loadAllCategories().then((data) => {
      console.log(data);
      setCategories(data);
    }).catch(error => {
      console.log(error);
    })

    getPost(blogId).then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category?.categoryId });
      }).catch((error) => {
        console.log(error);
        toast.error("Error in loading the blog");
      });
  }, []);

  useEffect(() => {
    console.log("Second");
    if (post) {
      if (post.user.id !== object.user.data.id) {
        toast.error("This is not your post");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({...post, [fieldName]:event.target.value})
  }

  const updatePost = (event) => {
    event.preventDefault()
    console.log(post.categoryId);
    updatePostService({ ...post, category: { categoryId: post.categoryId } }, post.id).then((response) => {
      console.log(response);
      toast.success("Blog updated successfully");
    }).catch((error) => {
      console.log(error);
      toast.error("Error in updating the blog");
    })
  }

  const updateHtml = () => {
    return (
      <div className="wrapper">
        {/* {JSON.stringify(post)} */}
        <Card className="shadow mt-3">
          <CardBody>

            <h1>Update Post</h1>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input type="text" id="title" name="title" placeholder="Enter your post title"
                  className="rounded-2" onChange={(event) => handleChange(event, 'title')} value={post.title} 
                  />
              </div>

              <div className="my-3">
                <Label for="content">Post Content</Label>
                {/* <Input type="textarea" id="content" name="content" placeholder="Enter your post content"
                            className="rounded-2" style={{height: '200px'}} /> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  // config={config}
                  onChange={newContent => setPost({...post, content:newContent})}
                />
              </div>

              <div className="mt-3">
                <Label for="image">Select Post Image</Label>
                <Input type="file" id="image" name="imageName"
                  accept="image/png, image/jpg" />
                {/* accept="image/* */}
              </div>
              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input type="select" id="category" name="categoryId"
                  className="rounded-2" onChange={(event) => handleChange(event, 'categoryId')} value={post.categoryId} >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {
                    categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId} >
                        {category.categoryName}
                      </option>
                    ))
                  }
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" className="rounded-2" color="primary">
                  Update Post
                </Button>
                <Button type="reset"
                  className="rounded-2 ms-2" color="warning">
                  Reset
                </Button>
              </Container>
            </Form>

            {/* {post.content} */}
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      <Container>
        {post && updateHtml()}
      </Container>
    </Base>
  )
}

export default UpdateBlog;
