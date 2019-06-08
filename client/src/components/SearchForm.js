import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Button,
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

const SearchForm = props => {
  const [isOpen, toggle] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState("AED");
  const [date, setDate] = useState(new Date());
  const [symbol, setSymbol] = useState("AMZN");

  const searchHandler = e => {
    e.preventDefault();
    props.setSearch({ currency, date, symbol: symbol });
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
    <Form onSubmit={searchHandler} style={{ justifyContent: "center" }} inline>
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
          <Input
            value={format(date, "YYYY-MM-DD")}
            onChange={date => setDate(date)}
          />
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
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" className="mt-4">
        Search
      </Button>
    </Form>
  );
};

const mapStateToProps = state => ({
  currency: state
});

export default connect(
  mapStateToProps,
  { getCurrencies }
)(SearchForm);
