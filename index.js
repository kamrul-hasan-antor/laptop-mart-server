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
    const productCollection = client.db("laptopMart").collection("products");
    const orderCollection = client.db("laptopMart").collection("orders");

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

    // get usr account
    app.get("/user", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // add products
    app.post("/addProducts", async (req, res) => {
      const data = req.body;
      const result = await productCollection.insertOne(data);
      res.send(result);
    });

    // Get all products
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/allCategories/:category", async (req, res) => {
      const productCategory = req.params.category;
      const query = { productCategory: productCategory };

      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });

    // add orders
    app.post("/addOrders", async (req, res) => {
      const data = req.body;
      const result = await orderCollection.insertOne(data);
      res.send(result);
    });

    // get orders by user email

    app.get("/orders", async (req, res) => {
      let query = {};
      if (req.query.id) {
        query = { id: req.query.id };
      }
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
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
