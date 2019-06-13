import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.PORT || 4000}/`
        : "https://pacific-cliffs-22277.herokuapp.com/"
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
