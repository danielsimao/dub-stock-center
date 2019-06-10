import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { format } from "date-fns";
import { connect } from "react-redux";
import { updateFavStock } from "../actions/favStockActions";

const SelectedStock = ({ symbol, close, currency, date, updateFavStock }) => {
  const addHandler = () => updateFavStock({ symbol, currency });

  return (
    <div className="d-flex justify-content-around flex-wrap">
      <Card style={{ marginTop: "2rem" }}>
        <CardBody>
          <CardTitle>
            <Button onClick={addHandler} close aria-label="Add">
              {" "}
              <span aria-hidden>+</span>
            </Button>
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
  favStock: state.favStock
});

export default connect(
  mapStateToProps,
  { updateFavStock }
)(SelectedStock);
