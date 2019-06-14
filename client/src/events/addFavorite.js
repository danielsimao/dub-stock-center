import React from "react";

const addFavorite = function addFavorite({ action }) {
  return {
    caption: (
      <h6>
        You added{" "}
        <span className="underline">{`${action.symbol}/${
          action.currency
        }`}</span>{" "}
        to your favorites
      </h6>
    )
  };
};

export default addFavorite;
