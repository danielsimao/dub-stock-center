import React from "react";

const addFavorite = function addFavorite({ action }) {
  return {
    caption: (
      <span>
        You added{" "}
        <span className="underline">{`${action.symbol}/${
          action.currency
        }`}</span>{" "}
        to your favorites
      </span>
    )
  };
};

export default addFavorite;
