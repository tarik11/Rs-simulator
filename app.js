const express = require("express");
const bodyParser = require("body-parser");
const graphQLHttp = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

const graphQLschema = require("./graphql/schema/index");
const graphQLresolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphQLHttp({
    schema: graphQLschema,
    rootValue: graphQLresolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://tarik:tarik@cluster0-v5qbp.mongodb.net/RS?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
    console.log("Succesfuly connected");
  })
  .catch((err) => console.log(err));

console.log("Running a GraphQL API server at http://localhost:8000/graphql");
