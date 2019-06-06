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
  Row,
  Col
} from "reactstrap";
import { getCurrencies } from "../actions/currencyActions";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import { format } from "date-fns";

const stocks = [
  "TSLA",
  "AAPL",
  "MSFT",
  "AMZN",
  "CSCO",
  "INTC",
  "GOOG",
  "SBUX",
  "EBAY",
  "CTXS"
];

const StockCenter = props => {
  const [isOpen, toggle] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [date, setDate] = useState(new Date());

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
    <div>
      <Container>
        <Form style={{ justifyContent: "center" }} inline>
          {" "}
          <FormGroup className="mb-2 mr-sm-5 mb-sm-0">
            <Label for="exampleCustomSelect" className="mr-sm-2">
              Currency:
            </Label>
            <CustomInput
              type="select"
              id="exampleCustomSelect"
              name="customSelect"
              placeholder={currency}
            >
              {currencies &&
                currencies.map((currency, id) => (
                  <option onClick={() => setCurrency(currency)} key={id}>
                    {currency}
                  </option>
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
          <Button color="secondary">Search</Button>{" "}
        </Form>

        <Row style={{ justifyContent: "center" }}>
          {stocks.map((stock, id) => (
            <Col key={id}>
              <Button
                style={{ width: "5rem", marginTop: "1rem" }}
                outline
                color="secondary"
              >
                {stock}
              </Button>{" "}
            </Col>
          ))}
        </Row>
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
