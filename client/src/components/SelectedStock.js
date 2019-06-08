import React from "react";

import { format } from "date-fns";

const SelectedStock = ({ symbol, close, currency, date }) => {
  return (
    <div
      style={{
        margin: "auto",
        width: "200px",
        marginTop: "10rem",
        padding: 10
      }}
    >
      {" "}
      <h6 style={{ fontWeight: 20, color: "grey" }}>{`NASDAQ: ${symbol}`}</h6>
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
      <span style={{ marginTop: 0 }}> {format(date, "ddd D MMM, YYYY")} </span>
    </div>
  );
};

export default SelectedStock;
