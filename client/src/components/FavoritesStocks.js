import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { format } from "date-fns";

const FavoritesStocks = () => {
  const [stocks, setStocks] = React.useState([
    {
      currency: "DKK",
      date: "2019-02-02",
      symbol: "AMZN",
      close: "123"
    },
    {
      currency: "DKK",
      date: "2019-02-02",
      symbol: "AMZN",
      close: "123"
    },
    {
      currency: "DKK",
      date: "2019-02-02",
      symbol: "AMZN",
      close: "123"
    }
  ]);

  const closeHandler = id => {
    const newStocks = [...stocks];
    newStocks.splice(id, 1);
    setStocks(newStocks);
  };
  return (
    <div className="d-flex justify-content-around flex-wrap">
      {stocks.map(({ symbol, close, currency, date }, id) => (
        <Card key={id} style={{ marginTop: "2rem" }}>
          <CardBody>
            <CardTitle>
              <Button
                onClick={() => closeHandler(id)}
                close
                aria-label="Cancel"
              >
                <span aria-hidden>&ndash;</span>
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
      ))}
    </div>
  );
};

export default FavoritesStocks;
