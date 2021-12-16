const CarTreatment = require("../models/CarTreatment");
const router = require("express").Router();

// ADD CAR TREATMENT
router.put("/add", async (req, res) => {
  try {
    console.log("add car treatment request: ", req.body);
    await new CarTreatment(req.body).save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE CAR TREATMENT
router.delete("/delete", async (req, res) => {
  try {
    // sometimes mongodb allows multiple unique index's, this func is fixing the problem.
    // User.createIndexes();
    console.log("delete", req.body);
    const isDeleted = await CarTreatment.findOneAndDelete({
      number: req.body.number,
    });
    console.log(isDeleted);
    isDeleted
      ? res.status(200).json({ status: "success" })
      : res.status(300).json({ error: "car treatment in not exists in DB." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
