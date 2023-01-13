const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Welcome to Laptop Mart Server");
});

app.listen(port, () => {
  console.log(`Listening From Port ${port}`);
});
