import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Button, Spinner, Alert } from "reactstrap";
import { format } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { getFavStock, deleteFavStock } from "../actions/favStockActions";
import ConfirmationModal from "./ConfirmationModal";

const FavoritesStocks = props => {
  const [stocks, setStocks] = useState(null);
  const [date, setDate] = useState("2019-02-06");
  const [favStocks, setFavStocks] = useState(null);
  const [isOpen, toggle] = useState(false);

  useEffect(() => setStocks(props.favStock.favStocks), [
    props.favStock.favStocks
  ]);

  useEffect(() => {
    async function fetchFavStock() {
      await props.getFavStock();
    }
    if (!props.favStock.loading && !stocks) fetchFavStock();
  }, [props, stocks]);

  const deleteHandler = id => {
    toggle(!isOpen);
    props.deleteFavStock(id);
    props.getFavStock();
  };
  return (
    <Query
      query={STOCKS_QUERY}
      variables={{
        stocksCurr: stocks,
        date
      }}
    >
      {({ loading, error, data }) => {
        if (!stocks || !stocks.length) {
          return (
            <div
              style={{
                margin: "7rem auto",
                textAlign: "center",
                width: "50%"
              }}
            >
              <Alert color="secondary">You have no Favorite Stocks</Alert>
            </div>
          );
        }

        if (loading || !data) {
          return (
            <div
              style={{
                margin: "7rem auto",
                textAlign: "center"
              }}
            >
              {" "}
              <Spinner color="secondary" />
            </div>
          );
        }

        if (data) setFavStocks(data.Stocks);
        return (
          <div className="d-flex justify-content-around flex-wrap">
            {favStocks &&
              data.Stocks.map(({ _id, symbol, close, currency }, id) => (
                <Card key={id} style={{ marginTop: "2rem" }}>
                  <CardBody>
                    <CardTitle>
                      <Button
                        onClick={() => toggle(!isOpen)}
                        close
                        aria-label="Cancel"
                      >
                        <ConfirmationModal
                          symbol={symbol}
                          currency={currency}
                          isOpen={isOpen}
                          toggle={toggle}
                          deleteHandler={() => deleteHandler(_id)}
                        />
                        <span aria-hidden>&ndash;</span>
                      </Button>
                    </CardTitle>{" "}
                    <div style={{ padding: "1rem" }}>
                      <h6
                        style={{ fontWeight: 20, color: "grey" }}
                      >{`NASDAQ: ${symbol}`}</h6>
                      <h2 style={{ fontWeight: 20, marginBottom: 2 }}>
                        {new Intl.NumberFormat({
                          minimumFractionDigits: 2
                        }).format(close)}
                        <span
                          style={{
                            fontSize: 20,
                            color: "grey",
                            fontWeight: 10,
                            marginLeft: 4
                          }}
                        >
                          {currency}
                        </span>
                      </h2>
                      <span style={{ marginTop: 0 }}>
                        {" "}
                        {format(date, "ddd D MMM, YYYY")}{" "}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
        );
      }}
    </Query>
  );
};

const STOCKS_QUERY = gql`
  query STOCKS_QUERY($stocksCurr: [stocksCurr], $date: String) {
    Stocks(stocksCurr: $stocksCurr, date: $date) {
      _id
      symbol
      currency
      close
    }
  }
`;

const mapStateToProps = state => ({
  favStock: state.favStock
});

export default connect(
  mapStateToProps,
  { getFavStock, deleteFavStock }
)(FavoritesStocks);
