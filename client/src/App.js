import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
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
      {console.log(auth)}
      {mount && (
        <>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
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
