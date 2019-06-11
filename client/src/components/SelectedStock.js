import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { format } from "date-fns";
import { connect } from "react-redux";
import { addFavStock } from "../actions/favStockActions";
import { clearErrors } from "../actions/errorActions";

const SelectedStock = ({
  symbol,
  close,
  currency,
  date,
  addFavStock,
  isAuthenticated,
  error,
  clearErrors
}) => {
  const [msg, setMsg] = useState(null);
  const [isOpen, toogle] = useState(false);

  useEffect(() => {
    if (error.id === "ADD_FAV_STOCKS_FAIL") {
      setMsg(error.msg.msg);
      toogle(true);
    } else {
      setMsg(null);
    }
  }, [error.id, error.msg.msg]);

  const addHandler = () => {
    addFavStock({ symbol, currency });
  };

  const closePopoverHandler = () => {
    toogle(false);
    clearErrors();
  };

  return (
    <div className="d-flex justify-content-around flex-wrap">
      <Card style={{ marginTop: "2rem" }}>
        <CardBody>
          <CardTitle>
            {isAuthenticated && (
              <>
                <Button
                  id="Popover1"
                  onClick={addHandler}
                  close
                  aria-label="Add"
                >
                  {" "}
                  <span aria-hidden>+</span>
                </Button>
                <Popover placement="right" isOpen={isOpen} target="Popover1">
                  <PopoverHeader>
                    <span>Warning</span>
                    <Button
                      id="Popover1"
                      onClick={closePopoverHandler}
                      close
                    />{" "}
                  </PopoverHeader>
                  <PopoverBody>{msg}</PopoverBody>
                </Popover>
              </>
            )}
          </CardTitle>{" "}
          <div style={{ padding: "1rem" }}>
            <h6
              style={{ fontWeight: 20, color: "grey" }}
            >{`NASDAQ: ${symbol}`}</h6>
            <h2 style={{ fontWeight: 20, marginBottom: 2 }}>
              {new Intl.NumberFormat({
                minimumFractionDigits: 2
              }).format(close)}
              <span
                style={{
                  fontSize: 20,
                  color: "grey",
                  fontWeight: 10,
                  marginLeft: 4
                }}
              >
                {currency}
              </span>
            </h2>
            <span style={{ marginTop: 0 }}>
              {" "}
              {format(date, "ddd D MMM, YYYY")}{" "}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  favStock: state.favStock,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { addFavStock, clearErrors }
)(SelectedStock);
