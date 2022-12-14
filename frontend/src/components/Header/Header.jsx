import React from "react";

// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/actions/userActions";

const Header = ({ setSearch }) => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  

  const { loginStatus } = userLogin;
  console.log('loginStatus:', loginStatus)

  // let userName =loginStatus?userLogin.userInfo.user.name:"user"
  // console.log('userName:', userName)

  const logOutHalndler = () => {
    dispatch(logout());
    navigate("/");
  };
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
              <Form.Control
                type="search"
                placeholder="Search Notes"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {loginStatus ? (
          <Nav className=" my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Link to="/mynotes">
              <Nav.Link href="/mynotes">My Notes</Nav.Link>
            </Link>
            <NavDropdown className="mr-5" title={userLogin.userInfo.user.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile" className="">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOutHalndler}> Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          ) : (
            <Nav.Link href="/login" style={{color:"white"}}>Login</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
