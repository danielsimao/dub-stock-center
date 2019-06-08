import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Button,
  Container,
  DropdownToggle,
  DropdownMenu,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Alert
} from "reactstrap";
import { getCurrencies } from "../actions/currencyActions";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const StockCenter = props => {
  const [isOpen, toggle] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState("AED");
  const [date, setDate] = useState(new Date());
  const [symbol, setSymbol] = useState("AMZN");
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

  const searchHandler = e => {
    e.preventDefault();
    setSearch({ ...search, currency, date, symbol });
  };

  useEffect(() => setCurrencies(props.currency.currency.currencies), [
    props.currency.currency.currencies
  ]);

  useEffect(() => {
    async function fetchItems() {
      await props.getCurrencies();
    }
    if (!props.currency.currency.loading && !currencies) fetchItems();
  }, [currencies, props]);

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
              <Form
                onSubmit={searchHandler}
                style={{ justifyContent: "center" }}
                inline
              >
                {" "}
                <FormGroup className="mb-2 mr-sm-4 mb-sm-0 mt-4">
                  <Label for="exampleCustomSelect" className="mr-sm-2">
                    Currency:
                  </Label>
                  <CustomInput
                    type="select"
                    id="exampleCustomSelect"
                    name="customSelect"
                    onChange={e => setCurrency(e.target.value)}
                  >
                    {currencies &&
                      currencies.map((currency, id) => (
                        <option key={id}>{currency}</option>
                      ))}
                  </CustomInput>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-4 mb-sm-0 mt-4">
                  <Label for="date" className="mr-sm-2">
                    Date:
                  </Label>
                  <InputGroup id="date">
                    <Input placeholder={format(date, "YYYY-MM-DD")} />
                    <InputGroupButtonDropdown
                      addonType="prepend"
                      isOpen={isOpen}
                      toggle={() => toggle(!isOpen)}
                    >
                      <DropdownToggle split outline />
                      <DropdownMenu>
                        <Calendar
                          activeStartDate={date}
                          onChange={date => {
                            setDate(date);
                            toggle(!isOpen);
                          }}
                        />{" "}
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-4 mb-sm-0 mt-4">
                  <Label for="stock" className="mr-sm-2">
                    Stock Symbol:
                  </Label>

                  <Input
                    id="stock"
                    placeholder={symbol}
                    onChange={e => setSymbol(e.target.value)}
                  />
                </FormGroup>
                <Button type="submit" className="mt-4">
                  Search
                </Button>
              </Form>

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
                    <h6
                      style={{ fontWeight: 20, color: "grey" }}
                    >{`NASDAQ: ${symbol}`}</h6>
                    <h2 style={{ fontWeight: 20, marginBottom: 2 }}>
                      {new Intl.NumberFormat({
                        minimumFractionDigits: 2
                      }).format(data.getStock[symbol].close)}
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
                      {format(date, "ddd D MMM, YYYY")}{" "}
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

const mapStateToProps = state => ({
  currency: state
});

export default connect(
  mapStateToProps,
  { getCurrencies }
)(StockCenter);
