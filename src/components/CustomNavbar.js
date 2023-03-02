import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as ReactLink } from 'react-router-dom';
import { NavbarToggler,NavItem, NavLink,Collapse,NavbarBrand,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem} from 'reactstrap';


function CustomNavbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavbarBrand tag={ReactLink} to="/">My Blog</NavbarBrand>
        <NavbarToggler aria-controls="responsive-navbar-nav" onClick={()=>setIsOpen(!isOpen)}/>
        <Collapse  isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
               </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/blogs">Blogs</NavLink>
            </NavItem> 
            <NavItem>
              <NavLink tag={ReactLink} to="/membership">Membership</NavLink>
              </NavItem>
             
          </Nav>
          <Nav>
             <NavItem>
              <NavLink tag={ReactLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
              <NavLink tag={ReactLink} to="/signup">SignUp</NavLink>
              </NavItem>
           <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                    <DropdownItem tag={ReactLink} to="/services" >Services</DropdownItem>
                <DropdownItem tag={ReactLink} to="/contact">Contact Us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;