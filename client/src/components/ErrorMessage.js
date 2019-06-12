import React from "react";
import { Badge } from "reactstrap";

const ErrorMessage = ({ error, style }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i} style={style}>
        <h6 style={{ color: "grey" }} data-test="graphql-error">
          <Badge color="danger">Ooops</Badge>{" "}
          {error.message.replace("GraphQL error: ", "")}{" "}
        </h6>
      </div>
    ));
  }
  return (
    <div style={style}>
      <h6 style={{ color: "grey" }} data-test="graphql-error">
        <Badge color="danger">Ooops</Badge>{" "}
        {error.message.replace("GraphQL error: ", "")}{" "}
      </h6>
    </div>
  );
};

export default ErrorMessage;
