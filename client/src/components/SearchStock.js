import React from "react";
import { Alert, Spinner } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";
import SelectedStock from "./SelectedStock";
import ErrorMessage from "./ErrorMessage";

const SearchStock = () => {
  const QUERY_STOCK = gql`
    query QUERY_STOCK($symbol: String, $date: String, $currency: String) {
      Stock(symbol: $symbol, date: $date, currency: $currency) {
        symbol
        currency
        date
        close
      }
    }
  `;

  return (
    <Query
      query={QUERY_STOCK}
      variables={{
        symbol: "AMZN",
        date: "2019-02-06",
        currency: "AED"
      }}
    >
      {({ loading, error, data, refetch }) => {
        return (
          <div>
            <SearchForm refetch={refetch} />

            {error ? (
              <ErrorMessage
                error={error}
                style={{
                  margin: "7rem auto",
                  textAlign: "center",
                  width: "50%"
                }}
              />
            ) : !loading ? (
              <SelectedStock
                close={data.Stock.close}
                currency={data.Stock.currency}
                date={data.Stock.date}
                symbol={data.Stock.symbol}
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
        );
      }}
    </Query>
  );
};

export default SearchStock;
