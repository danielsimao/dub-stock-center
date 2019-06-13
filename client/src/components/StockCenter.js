import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import FavoritesStocks from "./FavoritesStocks";
import SearchStock from "./SearchStock";

const StockCenter = ({ isAuthenticated }) => {
  return (
    <div>
      <Container>
        <h3 className="text-muted">Search Stock</h3>
        <div className="border-top">
          <SearchStock />
        </div>
        {isAuthenticated && (
          <>
            <h3 className="text-muted">Your Favorites</h3>
            <div className="border-top">
              <FavoritesStocks />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(StockCenter);
