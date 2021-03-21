import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // console.log(loggedInUser)
  
  return (
    <div>
        <Navbar className="nav">
          <Navbar.Brand style={{fontSize: '40px', fontWeight: 'bold'}}>Mountain Riding</Navbar.Brand>
          <Nav className="mr-auto" style={{marginLeft: '35%'}}>
            <Link to= '/home'>Home</Link>
            <Link to= '/destination'>Destination</Link>
            <Link to= '/content'>Content</Link>
            <Link to= '/login'>Login</Link>
            {loggedInUser.success && <Link>{loggedInUser.name?.split(' ').slice(0, 1)}</Link>}
          </Nav>
        </Navbar>
    </div>
  );
};

export default Header;
