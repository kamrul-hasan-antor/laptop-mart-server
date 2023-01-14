const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7ky8m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("laptopMart").collection("users");

    // Add Users
    app.post("/addUsers", async (req, res) => {
      const data = req.body;
      const result = await userCollection.insertOne(data);
      res.send(result);
    });

    // Get all users
    app.get("/allUsers", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/user", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = userCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("Welcome to Laptop Mart Server!!!");
});

app.listen(port, () => {
  console.log(`Listening From Port ${port}`);
});
