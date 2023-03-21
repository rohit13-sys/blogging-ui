import { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { isLoggedIn, getCurrentUser, DoLogout } from "../auth";
import userContext from "../context/userContext";

const CustomNavbar = () => {

  const navigate = useNavigate();
  const userContextData = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [userDto, setUserDto] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUserDto(getCurrentUser());
  }, [login]);

  const logout = () => {
    DoLogout(() => {
      setLogin(false);
      userContextData.SetUser({
        data: '',
        login:false
      })
      // navigate("/login");
      navigate("/blogs")
    });
    toast.success("User Logged Out Successfully");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
      <Container>
        <NavbarBrand>
          My Blog
        </NavbarBrand>
        <NavbarToggler
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/blogs">
                New Feeds
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to={"/services"}>
                Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to={"/membership"}>
                Membership
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/contact">
                  Contact Us
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/about">
                  About Us
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile-info">
                    Profile Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {userDto?.name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout} style={{cursor:"pointer"}}>Logout</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
