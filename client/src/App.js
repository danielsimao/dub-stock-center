import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import StockCenter from "./components/StockCenter";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = ({ loadUser, auth }) => {
  const [mount, setMount] = useState(true);

  React.useEffect(() => {
    if (auth.isAuthenticated === null && !auth.isLoading) {
      loadUser();
    }

    if (auth.isAuthenticated !== null && !auth.isLoading) {
      setMount(true);
    }
  }, [auth.isAuthenticated, auth.isLoading, loadUser, mount]);

  return (
    <div className="App">
      {mount && (
        <>
          <AppNavbar />
          <Container>
            <StockCenter />
          </Container>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(App);
