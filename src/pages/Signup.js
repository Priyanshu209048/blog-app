import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label, Form, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signup } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {

    const [data, setData]= useState({
        name: '',
        email: '',
        password: '',
        about: ''
    })

    const [error, setError] = useState({
        errors: {},
        isError: false
    })

    // useEffect(()=>{
    //     console.log(data);
    // }, [data])

    const handleChange=(event, property)=>{
        //Setting value dynamically
        setData({...data, [property]:event.target.value})
    }

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        })
    }

    const submitForm = (event) => {
        event.preventDefault()

        // if (error.isError) {
        //     toast.error("There is some error in the registration process!!");
        //     setError({...error, isError:false})
        //     return;
        // }

        console.log(data);
        //Validate Data

        //Call server api for sending data
        signup(data).then((response)=>{
            console.log(response)
            // setError({ ...error, isError: false, errors: "" });
            toast.success("Registration process completed!! || " + response.name)
            resetData()
            
        }).catch((error)=>{
            console.log(error)
            // console.log("Error log")
            toast.error("There is some error in the registration process!!");
            setError({
                errors:error,
                isError:true
            })
        })
        
    }

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    {/* { JSON.stringify(data) } */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        
                        <Card body
                            color="dark"
                            inverse>
                            <CardHeader className="text-center">
                                <h3>Fill Information to Register here!!</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input id="name" name="name" placeholder="Enter Name here" type="text"
                                        onChange={(e)=>handleChange(e, 'name')} value={data.name}
                                        invalid={error.errors?.response?.data?.name ? true : false}/>
                                        <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input id="email" name="email" placeholder="Enter Email here" type="email"
                                        onChange={(e)=>handleChange(e, 'email')} value={data.email}
                                        invalid={error.errors?.response?.data?.email ? true : false}/>
                                        <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input id="password" name="password" placeholder="Enter Password here" type="password"
                                        onChange={(e)=>handleChange(e, 'password')} value={data.password}
                                        invalid={error.errors?.response?.data?.password ? true : false}/>
                                        <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input id="about" name="about" placeholder="Enter About here" type="textarea" style={{height: "150px"}}
                                        onChange={(e)=>handleChange(e, 'about')} value={data.about}
                                        invalid={error.errors?.response?.data?.about ? true : false}/>
                                        <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>
                                    </FormGroup>

                                    <Container className="text-center">
                                        <Button color="primary" type="submit">Submit</Button>
                                        <Button color="warning" type="reset" onClick={resetData} className="ms-3">Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    
                    </Col>
                </Row>
            </Container>

        </Base>
    );
};

export default Signup;