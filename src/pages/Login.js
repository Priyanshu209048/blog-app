import { Card, CardBody, CardHeader, Col, Container, Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import Base from "../components/Base";
import { useState, useContext } from "react";
import { login } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

    const userContextData = useContext(userContext);

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event, property) => {
        let value = event.target.value
        setData({...data, [property]:value})
    }

    const reset = () => {
        setData({
            username: '',
            password: ''
        })
    }

    const submitLoginForm = (event) => {
        event.preventDefault()

        console.log(data);

        if (data.username.trim() == '') {
            toast.error("Username can't be null !!")
            return;
        }
        if (data.password.trim() == '') {
            toast.error("Password can't be null !!")
            return;
        }

        login(data).then((jwtToken) => {
            console.log(jwtToken)
            console.log(data);

            doLogin(jwtToken, () => {
                console.log("Login details saved to localstorage")
                //Redirect to dashboard
                userContextData.setUser({
                    data: jwtToken.user,
                    login: true
                })
                navigate('/user/dashboard')
            })

            toast.success("Login completed successfully")
        }).catch((error) => {
            console.log(error)
            if (error.response.status == 400 || error.response.status == 404) {
                toast.error(error.response.data.message)
            } else {
                toast.error("There is an error during the login process !!")
            }
        })
    }

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset:3 }}>
                        <Card body
                            color="secondary"
                            inverse>
                            <CardHeader className="text-center">
                                <h4>Login Form!!</h4>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitLoginForm}>
                                <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input id="email" name="email" placeholder="Enter Email here" type="email" value={data.username}
                                        onChange={(e) => handleChange(e, 'username')}/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input id="password" name="password" placeholder="Enter Password here" type="password" value={data.password}
                                        onChange={(e) => handleChange(e, 'password')}/>
                                    </FormGroup>
                                    
                                    <Container className="text-center">
                                        <Button color="info" type="submit">Login</Button>
                                        <Button color="warning" type="reset" onClick={reset} className="ms-3">Reset</Button>
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

export default Login;