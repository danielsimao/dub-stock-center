import React, { useState } from "react";
import { Container, Alert } from "reactstrap";
import { format } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";

const StockCenter = () => {
  const [search, setSearch] = useState({
    currency: "AED",
    date: new Date(),
    symbol: "AMZN"
  });
  //TODO: Fix media query
  const QUERY_STOCK = gql`
    query QUERY_STOCK($symbol: String, $date: String, $currency: String) {
      getStock(symbol: $symbol, date: $date, currency: $currency) {
        ${search.symbol} {
          close
        }
      }
    }
  `;

  return (
    <Query
      query={QUERY_STOCK}
      variables={{
        symbol: search.symbol,
        date: format(search.date, "YYYY-MM-DD"),
        currency: search.currency
      }}
    >
      {({ loading, error, data }) => {
        return (
          <div>
            <Container>
              <SearchForm setSearch={setSearch} />

              {error ? (
                <Alert
                  style={{
                    margin: "auto",
                    marginTop: "10rem",
                    padding: 10,
                    textAlign: "center"
                  }}
                  color="warning"
                >
                  {error.message.split(":")[1]}
                </Alert>
              ) : (
                !loading && (
                  <div
                    style={{
                      margin: "auto",
                      width: "200px",
                      marginTop: "10rem",
                      padding: 10
                    }}
                  >
                    {" "}
                    <h6 style={{ fontWeight: 20, color: "grey" }}>{`NASDAQ: ${
                      search.symbol
                    }`}</h6>
                    <h2 style={{ fontWeight: 20, marginBottom: 2 }}>
                      {new Intl.NumberFormat({
                        minimumFractionDigits: 2
                      }).format(data.getStock[search.symbol].close)}
                      <span
                        style={{
                          fontSize: 20,
                          color: "grey",
                          fontWeight: 10,
                          marginLeft: 4
                        }}
                      >
                        {search.currency}
                      </span>
                    </h2>
                    <span style={{ marginTop: 0 }}>
                      {" "}
                      {format(search.date, "ddd D MMM, YYYY")}{" "}
                    </span>
                  </div>
                )
              )}
            </Container>
          </div>
        );
      }}
    </Query>
  );
};

export default StockCenter;
