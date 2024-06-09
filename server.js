"use strict";
const express = require("express");
const createError = require("http-errors");

const app = express();

app.get("/", (req, res) => {
  res.send("sup sup");
});

app.use((req, res, next) => {
  if (req.url === "/" && req.method === "POST") {
    next(createError(405));
    return;
  }
  next();
});

app.use((err, req, res, next) => {
  if (!err) {
    next();
  }
  res.status(err.status);
  res.send(err.message);
});

app.listen(3000);
