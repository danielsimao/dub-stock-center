const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const graphqlServer = require("./graphql/graphqlServer");

const app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Mongodb Connected..."))
  .catch(err => console.log(err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/stock", require("./routes/api/stock"));
app.use("/api/currency", require("./routes/api/currency"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

graphqlServer.express.use(app);

graphqlServer.start({ port: process.env.PORT || 4000 }, ({ url }) =>
  console.log(`GraphQL Server is running on ${url}`)
);
