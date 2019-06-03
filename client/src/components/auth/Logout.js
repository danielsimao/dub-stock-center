import React from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Logout = ({ logout }) => {
  return (
    <>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </>
  );
};

export default connect(
  null,
  { logout }
)(Logout);
