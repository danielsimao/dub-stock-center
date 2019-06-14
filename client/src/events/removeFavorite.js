import React from "react";
import { Badge } from "reactstrap";

const removeFavorite = function removeFavorite({ action }) {
  return {
    caption: (
      <div className="d-flex flex-row">
        <Badge color="danger">&nbsp;</Badge>
        <h6 style={{ marginLeft: 9, marginBottom: 0 }}>
          You removed{" "}
          <span style={{ fontWeight: "bold" }} className="underline">{`${
            action.symbol
          }/${action.currency}`}</span>{" "}
          from your favorites
        </h6>
      </div>
    )
  };
};

export default removeFavorite;
