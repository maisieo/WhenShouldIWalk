var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET all walks
router.get("/walks", async (req, res) => {
  try {
    let results = await db("SELECT * FROM walks");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  //Whenever we access a DB with "async" and "await", we need the "try" and "catch"
  try {
    //db data must be known, we tell MYSQL to select from the table called "inventory", since we are
    //already in the DB rampup
    //Has to be in MYSQL syntax
    let results = await db("SELECT * FROM walks");

    if (results.data.length) {
      //check
      console.log("RESULTS", results);
      //send back the full list of items with status
      res.status(200).send(results.data);
    } else {
      res.status(404).send({ error: "Db is inaccesible or empty." });
    }
    //Catch any errors
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET one walk
router.get("/walks/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    let sql = `SELECT * FROM walks WHERE id = ${id}`; //mysql statement
    let results = await db(sql);
    if (results.data.length === 1) {
      //if a result is found
      res.send(results.data[0]); //send the first (and only) one in the list
    } else {
      res.status(404).send({ error: "Walk not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new walk into the DB
router.post("/walks", async (req, res) => {
  let { title, date, time } = req.body;
  let sql = `
  INSERT INTO walks (title, date, time)
  VALUES ("${title}", "${date}", "${time}")
  `;
  try {
    let results = await db(sql);
    results = await db("SELECT * FROM walks");
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a walk from the DB
router.delete("/walks/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let sql = `SELECT * FROM walks WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      sql = `DELETE FROM walks WHERE id = ${id}`;
      await db(sql); //calls again to return all walks
      results = await db("SELECT * FROM walks");
      res.send(results.data);
    } else {
      res.status(404).send({ error: "Walk with that name not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
