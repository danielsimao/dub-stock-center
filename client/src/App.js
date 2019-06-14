import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import StockCenter from "./components/StockCenter";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar, { SideBarButton, MyProvider } from "./components/SideBar";

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
    <div id="App" className="App">
      {mount && (
        <>
          {auth.isAuthenticated && (
            <MyProvider>
              <SideBarButton />
              <SideBar />
            </MyProvider>
          )}
          <div id="page-wrap">
            <AppNavbar />
            <Container>
              <StockCenter />
            </Container>
          </div>
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
