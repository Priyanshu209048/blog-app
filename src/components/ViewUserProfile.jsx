import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Container, Table } from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";

const ViewUserProfile = ({ user }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(getCurrentUser())
        setLogin(isLoggedIn())
    }, [])

  return (
    <Card className="mt-2 border-0 shadow rounded">
      <CardBody>
        <h3 className="text-uppercase">User Information</h3>

        <Container className="text-center">
          <img
            style={{ maxWidth: "250px", maxHeight: "250px" }}
            src={ user.image ? user.image : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg' }
            alt="User profile image"
            className="img-fluid"
          ></img>
        </Container>

        <Table
          responsive
          hover
          bordered={true}
          className="mt-4 text-center"
          striped
        >
          <tbody>
            <tr>
              <th>BLOGS ID</th>
              <td>BLOG{user.id}</td>
            </tr>
            <tr>
              <th>USER NAME</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>USER EMAIl</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>USER ABOUT</th>
              <td>{user.about}</td>
            </tr>
            <tr>
              <th>USER ROLE</th>
              <td>
                {user.roles.map((role) => {
                  return <div key={role.id}>{role.roleType}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>

        {currentUser ? (currentUser.id == user.id) ? (
            <CardFooter className="text-center">
                <Button color="warning">Update Profile</Button>
            </CardFooter>
        ) : '' : ''}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
