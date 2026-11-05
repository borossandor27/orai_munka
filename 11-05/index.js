import express from "express";

const app = express();

function m01(req, res, next) {
  console.log("m01");
  //next();
}

function m02(req, res, next) {
  console.log("m02");
  next();
}

function m03(req, res, next) {
  console.log("m03");
  next();
}

app.get("/123", m01, m02, m03, (req, res) => {
  res.send("Hello World");
});

app.get("/213", m02, m01, m03, (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
}); 