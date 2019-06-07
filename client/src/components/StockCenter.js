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
  CustomInput
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
  const [currency, setCurrency] = useState(null);
  const [date, setDate] = useState(new Date());
  const [symbol, setSymbol] = useState("AMZN");
  const [isSearch, setSearch] = useState(false);

  const QUERY_STOCK = gql`
    query QUERY_STOCK($symbol: String, $date: String, $currency: String) {
      getStock(symbol: $symbol, date: $date, currency: $currency) {
        ${symbol} {
          open
        }
      }
    }
  `;

  useEffect(() => setCurrencies(props.currency.currency.currencies), [
    props.currency.currency.currencies
  ]);

  useEffect(() => {
    async function fetchItems() {
      await props.getCurrencies();
    }
    if (!props.currency.currency.loading && !currencies) fetchItems();
  }, [currencies, props]);

  const search = () => setSearch(!isSearch);

  return (
    <div>
      <Container>
        <Form style={{ justifyContent: "center" }} inline>
          {" "}
          <FormGroup className="mb-2 mr-sm-5 mb-sm-0">
            <Label for="exampleCustomSelect" className="mr-sm-2">
              Currency:
            </Label>
            {console.log(currency)}
            <CustomInput
              type="select"
              id="exampleCustomSelect"
              name="customSelect"
              placeholder={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              {currencies &&
                currencies.map((currency, id) => (
                  <option key={id}>{currency}</option>
                ))}
            </CustomInput>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-5 mb-sm-0">
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
                    onChange={date => setDate(date)}
                  />{" "}
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-5 mb-sm-0">
            <Label for="stock" className="mr-sm-2">
              Stock Symbol:
            </Label>

            <Input
              id="stock"
              placeholder={symbol}
              onChange={e => setSymbol(e)}
            />
          </FormGroup>
          <Button onClick={search}>Search</Button>
        </Form>

        {isSearch ? (
          <Query
            query={QUERY_STOCK}
            variables={{ symbol, date: format(date, "YYYY-MM-DD"), currency }}
          >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              console.log(data);
              return (
                <div
                  style={{
                    margin: "auto",
                    width: "200px",
                    marginTop: "10rem",
                    padding: 10
                  }}
                >
                  <h6
                    style={{ fontWeight: 20, color: "grey" }}
                  >{`NASDAQ: ${symbol}`}</h6>
                  <h2 style={{ fontWeight: 20, marginBottom: 2 }}>
                    {new Intl.NumberFormat({
                      minimumFractionDigits: 2
                    }).format(1234)}
                    <span
                      style={{
                        fontSize: 20,
                        color: "grey",
                        fontWeight: 10,
                        marginLeft: 4
                      }}
                    >
                      USD
                    </span>
                  </h2>
                  <span style={{ marginTop: 0 }}>
                    {" "}
                    {format(date, "ddd D MMM, YYYY")}{" "}
                  </span>
                </div>
              );
            }}
          </Query>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  currency: state
});

export default connect(
  mapStateToProps,
  { getCurrencies }
)(StockCenter);
