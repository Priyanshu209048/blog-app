import { Card, CardBody, Form, Label, Input, Container, Button } from "reactstrap"
import { loadAllCategories } from "../services/category-service";
import { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as addPost, uploadPostImage } from "../services/post-service";
import { getCurrentUser } from "../auth";

const AddPost = () => {

    const [categories, setCategories] = useState([]);

    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })

    const resetData = () => {
        setPost({
            title:'',
            content:'',
            categoryId:''
        })
    }

    const [image, setImage] = useState(null)

    // const config = {
    //     placeholder: "Start typing here..."
    // }

    useEffect(() => {
        setUser(getCurrentUser())

        loadAllCategories().then((data) => {
            console.log(data);
            setCategories(data);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    const createPost = (event) => {
        event.preventDefault();

        // console.log(post);
        // console.log("Post Success")

        if (post.title.trim() === '') {
            toast.error("Post title can't be null !!")
            return;
        }
        if (post.content.trim() === '') {
            toast.error("Post content can't be null !!")
            return;
        }
        if (post.categoryId === '') {
            toast.error("Post category can't be null !!")
            return;
        }

        post['userId'] = user.id
        addPost(post).then((data) => {
            //setCategories(data)
            uploadPostImage(image, data.id).then(data => {
                toast.success("Image Uploaded !!")
            }).catch((error) => {
                toast.error("Error during uploading image !!")
                console.log(error);                
            })

            toast.success("Post uploaded successfuly !!")
            // resetData();
            // window.location.reload();
        }).catch(error => {
            console.log(error);
            toast.error("There some error in the form !!")
        })
    }

    const fieldChanged = (event) => {
        setPost({...post, [event.target.name]:event.target.value})
    }

    const contentFieldChanged = (data) => {
        setPost({...post, 'content':data});
    }

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    return(
        <div className="wrapper">

            <Card className="shadow mt-3">

                <CardBody>
                    {/* {JSON.stringify(post)} */}

                    <h1>What is in your mind?</h1>
                    <Form onSubmit={createPost}>

                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name="title" placeholder="Enter your post title"
                            className="rounded-2" onChange={fieldChanged} value={post.title} />
                        </div>

                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" name="content" placeholder="Enter your post content"
                            className="rounded-2" style={{height: '200px'}} /> */}
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                // config={config}
                                onChange={(newContent) => contentFieldChanged(newContent)}
                            />
                        </div>

                        <div className="mt-3">
                            <Label for="image">Select Post Image</Label>
                            <Input type="file" id="image" name="imageName" onChange={handleFileChange} accept="image/png, image/jpg" />  
                            {/* accept="image/* */}
                        </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" name="categoryId"
                            className="rounded-2" onChange={fieldChanged} defaultValue='' >
                                <option value='' disabled>Select a category</option>
                                {categories.map((category) => (
                                    <option  key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                ))}
                                
                            </Input>
                        </div>

                        <Container className="text-center">
                            <Button type="submit" className="rounded-2" color="primary">Add Post</Button>
                            <Button type="reset" onClick={resetData} className="rounded-2 ms-2" color="warning">Reset</Button>
                        </Container>

                    </Form>

                    {/* {post.content} */}

                </CardBody>

            </Card>
            
        </div>
    )
}

export default AddPost