import React from "react";
import { Badge } from "reactstrap";

const addFavorite = function addFavorite({ action }) {
  return {
    caption: (
      <div className="d-flex flex-row">
        <Badge color="success">&nbsp;</Badge>
        <h6 style={{ marginLeft: 9, marginBottom: 0 }}>
          You added{" "}
          <span style={{ fontWeight: "bold" }} className="underline">{`${
            action.symbol
          }/${action.currency}`}</span>{" "}
          to your favorites
        </h6>
      </div>
    )
  };
};

export default addFavorite;
