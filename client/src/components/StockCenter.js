import React, { useState } from "react";
import { Container, Alert, Spinner } from "reactstrap";
import { format } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";
import SelectedStock from "./SelectedStock";

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
        console.log(data);
        return (
          <div>
            <Container>
              <SearchForm setSearch={setSearch} refetch={refetch} />

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
                    margin: "auto",
                    marginTop: "10rem",
                    padding: 10,
                    textAlign: "center"
                  }}
                >
                  {" "}
                  <Spinner color="secondary" />
                </div>
              )}
            </Container>
          </div>
        );
      }}
    </Query>
  );
};

export default StockCenter;
