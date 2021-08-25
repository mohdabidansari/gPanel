const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser');

const getAllUsers = require("./Users/getAllUsers");
const getUserById = require("./Users/getUserById");
const createAliases = require("./Users/createAliases");
const getOrgUnits = require("./Users/getOrgUnits");
const getAliases = require("./Users/getAliases");
const createSignature = require("./Users/createSignature");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello From Backend" });
});
app.get("/api/users", async (req, res) => {
  const result = await getAllUsers();
  res.json({ result: result });
});

app.get("/api/users/:id", async (req, res) => {
  const result = await getUserById(req.params.id);
  res.json({ result: result });
});
app.get("/api/create", async (req, res) => {
  const result = await createAliases();
  res.json({ result: result });
});
app.get("/api/org", async (req, res) => {
  const result = await getOrgUnits();
  res.json({ result: result });
});
app.get("/api/aliases/:id", async (req, res) => {
  const result = await getAliases(req.params.id);
  res.json({ result: result });
});

app.patch("/api/create/signature", async (req, res) => {
  const result = await createSignature(req.body.obj);
  res.json({ result: result });
});
const port = process.env.PORT || 9000;
app.listen(port, () => console.log("App running on port " + port));
