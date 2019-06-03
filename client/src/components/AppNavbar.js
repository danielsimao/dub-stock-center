import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

const AppNavbar = ({ auth }) => {
  const [isOpen, toggle] = useState(false);

  const { isAuthenticated, user } = auth;

  const authLinks = (
    <>
      {" "}
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user && `Welcome ${user.name}`} </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={() => toggle(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
