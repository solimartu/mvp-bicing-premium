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

router.post("/", async function (req, res, next) {
  try {
    const {
      PickUpStation,
      PickUpTime,
      ReturnStation,
      ReturnTime,
      userId,
      PathName,
      Favourite,
    } = req.body;

    const query = `INSERT INTO myreservations (PickUpStation, PickUpTime, ReturnStation, ReturnTime, userId, PathName, Favourite) VALUES ("${PickUpStation}","${PickUpTime}","${ReturnStation}","${ReturnTime}","${userId}","${PathName}", 0);`;

    console.log(query);

    await db(query);
    res.send({ message: "insertion was OK" });
  } catch (err) {
    res.status(500).send(err);
  }
});

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
