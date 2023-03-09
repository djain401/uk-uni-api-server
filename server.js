"use strict";
//imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pg = require("pg");
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.get("/", homeHandler);
app.get("/university", getUniversityHandler);
app.post("/university", addUniversityHandler);
app.delete("/university", deleteUniversityHandler);

function homeHandler(request, response) {
  response.status(200).send("Hello");
}

function addUniversityHandler(request, response) {
  let { uniname, uniwebpage } = request.body;

  let SQL =
    "INSERT INTO universities (uniname, uniwebpage) VALUES ($1, $2) RETURNING *";
  let safeValues = [uniname, uniwebpage];

  client
    .query(SQL, safeValues)
    .then((results) => {
      response.status(200).json(results.rows);
    })
    .catch((error) => console.log(error));
}

function getUniversityHandler(request, response) {
  let SQL = "SELECT * FROM universities";
  client
    .query(SQL)
    .then((results) => {
      response.status(200).send(results.rows);
    })
    .catch((error) => console.log(error));
}

function deleteUniversityHandler(request, response) {
  let uniname = request.query.uniname;
  console.log(uniname);
  let safeValues = [uniname];
  let SQL = "Delete FROM universities WHERE uniname=$1 RETURNING *";
  client
    .query(SQL, safeValues)
    .then((results) => {
      response.status(200).json(results.rows);
    })
    .catch((error) => console.log(error));
}

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
