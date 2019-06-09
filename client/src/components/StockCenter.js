import React, { useState } from "react";
import { Container, Alert, Spinner } from "reactstrap";
import { format } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";
import SelectedStock from "./SelectedStock";
import FavoritesStocks from "./FavoritesStocks";

const StockCenter = () => {
  const [search, setSearch] = useState({
    currency: "AED",
    date: new Date(),
    symbol: "AMZN"
  });
  //TODO: Fix media query
  const QUERY_STOCK = gql`
    query QUERY_STOCK($symbol: String, $date: String, $currency: String) {
      Stock(symbol: $symbol, date: $date, currency: $currency) {
        close
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
      {({ loading, error, data, refetch }) => {
        return (
          <div>
            <Container>
              <h3 className="text-muted">Search Stock</h3>
              <div className="border-top">
                <SearchForm setSearch={setSearch} refetch={refetch} />

                {error ? (
                  <Alert
                    style={{
                      margin: "7rem auto",
                      textAlign: "center",
                      width: "50%"
                    }}
                    color="warning"
                  >
                    {error.message.split(":")[1]}
                  </Alert>
                ) : !loading ? (
                  <SelectedStock
                    close={data.Stock.close}
                    currency={search.currency}
                    date={search.date}
                    symbol={search.symbol}
                  />
                ) : (
                  <div
                    style={{
                      margin: "7rem auto",
                      textAlign: "center"
                    }}
                  >
                    {" "}
                    <Spinner color="secondary" />
                  </div>
                )}
              </div>

              <h3 className="text-muted">Your Favorites</h3>
              <div className="border-top">
                <FavoritesStocks />
              </div>
            </Container>
          </div>
        );
      }}
    </Query>
  );
};

export default StockCenter;
