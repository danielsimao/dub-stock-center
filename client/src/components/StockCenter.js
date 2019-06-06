import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Dropdown,
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { getCurrencies } from "../actions/currencyActions";
import { connect } from "react-redux";
import Calendar from "react-calendar";

const StockCenter = props => {
  const [isOpenCurr, toggleCurr] = useState(false);
  const [isOpenCalender, toggleCalender] = useState(false);

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
        <ButtonDropdown
          addonType="append"
          isOpen={isOpenCurr}
          toggle={() => toggleCurr(!isOpenCurr)}
        >
          <DropdownToggle caret>
            {currency ? currency : "Currency"}
          </DropdownToggle>
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: data => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: "auto",
                      maxHeight: 100
                    }
                  };
                }
              }
            }}
          >
            {currencies &&
              currencies.map((currency, id) => (
                <DropdownItem onClick={() => setCurrency(currency)} key={id}>
                  {currency}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </ButtonDropdown>
        <InputGroup>
          <Input />

          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={isOpenCalender}
            toggle={() => toggleCalender(!isOpenCalender)}
          >
            <DropdownToggle split outline />
            <DropdownMenu>
              <DropdownItem>
                <Calendar onChange={date => setDate(date)} value={date} />{" "}
              </DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
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
