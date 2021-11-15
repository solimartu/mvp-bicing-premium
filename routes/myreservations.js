var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET my reservations listing. */
router.get("/", async function (req, res, next) {
  try {
    const results = await db(`SELECT * FROM myreservations;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST for adding a new reservation
router.post("/", async function (req, res, next) {
  try {
    const {
      PickUpStation,
      ReturnStation,
      userId,
      PathName,
      Favourite,
      picktime,
      retime,
      daysrange,
    } = req.body;
    const query = `INSERT INTO myreservations (PickUpStation, ReturnStation, userId, PathName, Favourite, picktime, retime, daysrange) VALUES ("${PickUpStation}","${ReturnStation}","${userId}","${PathName}", 0, "${picktime}", "${retime}", "${daysrange}");`;
    await db(query);
    res.send({ message: "insertion was OK" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a reservation
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await db(`DELETE FROM myreservations WHERE id=${id};`);
    const results = await db(`SELECT * FROM myreservations;`);
    // console.log("this is the data:", data);
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT for setting a reservation as a favourite one
router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await db(
      `UPDATE myreservations SET Favourite = !Favourite WHERE id=${id};`
    );
    const results = await db(`SELECT * FROM myreservations;`);
    // console.log("this is the data:", data);
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET all the favourite reservations -used in the form-
router.get("/favourites", async function (req, res, next) {
  try {
    const results = await db(
      `SELECT * FROM myreservations WHERE Favourite = 1;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
