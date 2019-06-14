import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Button, Spinner } from "reactstrap";
import { format } from "date-fns";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { getFavStock, deleteFavStock } from "../actions/favStockActions";
import ConfirmationModal from "./ConfirmationModal";
import ErrorMessage from "./ErrorMessage";
import { isEqual } from "lodash";

const FavoritesStocks = props => {
  const [stocks, setStocks] = useState(null);
  const [date] = useState("2019-02-06");
  const [isOpen, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(props.favStock.loading || props.data.loading), [
    props.data.loading,
    props.favStock.loading
  ]);

  useEffect(() => {
    setStocks(props.favStock.favStocks);
    if (!isEqual(props.data.variables.stocksCurr, stocks)) {
      props.data.refetch({ stocksCurr: props.favStock.favStocks, date });
    }
  }, [date, props.data, props.favStock.favStocks, stocks]);

  useEffect(() => {
    async function fetchFavStock() {
      await props.getFavStock();
    }
    if (!props.favStock.loading && !stocks) fetchFavStock();
  }, [props, stocks]);

  if (isLoading) {
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

  if (props.data.error) {
    return (
      <ErrorMessage
        error={props.data.error}
        style={{
          margin: "7rem auto",
          textAlign: "center",
          width: "50%"
        }}
      />
    );
  }

  return (
    <div className="d-flex justify-content-around flex-wrap">
      {props.data.Stocks !== undefined &&
        props.data.Stocks.map(({ _id, symbol, close, currency }, id) => (
          <Card key={id} style={{ marginTop: "2rem" }}>
            <CardBody>
              <CardTitle>
                <Button
                  onClick={() => toggle(!isOpen)}
                  close
                  aria-label="Cancel"
                >
                  <ConfirmationModal
                    id={_id}
                    symbol={symbol}
                    currency={currency}
                    isOpen={isOpen}
                    toggle={toggle}
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

export default compose(
  graphql(STOCKS_QUERY, {
    options: props => ({
      variables: {
        stocksCurr: [],
        date: "2019-02-06"
      }
    }),
    props: ({ data }) => ({
      data
    })
  }),
  connect(
    mapStateToProps,
    { getFavStock, deleteFavStock }
  )
)(FavoritesStocks);
