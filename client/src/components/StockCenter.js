import React, { useState, useEffect } from "react";
import {
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { getCurrencies } from "../actions/currencyActions";
import { connect } from "react-redux";

const StockCenter = props => {
  const [isOpen, toggle] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      await props.getCurrencies();
    }
    !currencies && fetchItems();

    !props.currencies.loading && setCurrencies(props.currencies.currencies);
  }, [currencies, props]);

  return (
    <div>
      <Container>
        <ButtonDropdown
          addonType="append"
          isOpen={isOpen}
          toggle={() => toggle(!isOpen)}
        >
          {console.log(props)}
          <DropdownToggle caret>Currency</DropdownToggle>
          <DropdownMenu>
            {currencies.map(currency => (
              <DropdownItem>{currency}</DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  { getCurrencies }
)(StockCenter);
