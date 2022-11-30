import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate()
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand href="/">MERN Note-Zipper</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0">
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search Notes" className="me-2" aria-label="Search" />
            </Form>
          </Nav>
          <Nav className=" my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Link to="/mynotes">
              <Nav.Link href="/mynotes">My Notes</Nav.Link>
            </Link>
            <NavDropdown title="Gowtham" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{localStorage.removeItem('userInfo');
              navigate('/');
              }} > Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
