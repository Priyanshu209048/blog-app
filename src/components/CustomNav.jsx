import React, { useEffect, useState, useContext } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import { doLogout, getCurrentUser, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

const CustomNav = () => {

    const userContextData = useContext(userContext);

    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    const navigate = useNavigate()

    useEffect(() => {
      setLogin(isLoggedIn())
      setUser(getCurrentUser())
    }, [login])

    const logout = () => {
      doLogout(() => {
        setLogin(false)
        userContextData.setUser({
          data: null,
          login: false
        })
        // navigate("/")
      })
    }

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
          <Navbar
            color="dark"
            dark
            expand="md"
            fixed=""
            className='px-2'
          >
            <NavbarBrand tag={ReactLink} to="/">TechBlog</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                {/* <NavItem>
                  <NavLink tag={ReactLink} to="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    More
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={ReactLink} to="/services">Services</DropdownItem>
                    <DropdownItem tag={ReactLink} to="/contactus">Contact Us</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>LinkedIn</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>

              <Nav navbar>
                <NavItem>
                  <NavLink tag={ReactLink} to={isLoggedIn() ? "/user/dashboard" : "/"}>
                  {isLoggedIn() ? "Dashboard" : "New Feeds"}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/services">
                    Services
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    More
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Github</DropdownItem>
                    <DropdownItem>LinkedIn</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={ReactLink} to="/contactus">Contact Us</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {
                    login && (
                      <>
                        {/* <NavItem>
                          <NavLink tag={ReactLink} to="/user/dashboard">
                            Profile
                          </NavLink>
                        </NavItem> */}

                        <NavItem>
                          <NavLink tag={ReactLink} to={`/user/profile/${user.id}`}>
                            {user.name}
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink onClick={logout} tag={ReactLink} to="/">
                            Logout
                          </NavLink>
                        </NavItem>
                      </>
                    )
                }

                {
                  !login && (
                    <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/signup">
                        Signup
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/login">
                        Login
                      </NavLink>
                    </NavItem>
                    </>
                  )
                }
              </Nav>

              {/* <NavbarText>Github</NavbarText> */}
            </Collapse>
          </Navbar>
        </div>
    );
};

export default CustomNav;