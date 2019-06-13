import React from "react";

const removeFavorite = function removeFavorite({ action }) {
  return {
    caption: (
      <span>
        You removed{" "}
        <span className="underline">{`${action.symbol}/${
          action.currency
        }`}</span>{" "}
        from your favorites
      </span>
    )
  };
};

export default removeFavorite;
