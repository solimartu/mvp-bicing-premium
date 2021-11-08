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
    } = req.body;
    await db(
      `INSERT INTO myreservations (PickUpStation, PickUpTime, ReturnStation, ReturnTime, userId, PathName) VALUES ("${PickUpStation}","${PickUpTime}","${ReturnStation}","${ReturnTime}","${userId}","${PathName}");`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await db(`DELETE FROM myreservations WHERE id=${id};`);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
