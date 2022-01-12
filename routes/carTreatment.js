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
    const isDeleted = await CarTreatment.findByIdAndDelete(req.body);
    console.log(isDeleted);
    isDeleted
      ? res.status(200).json({ status: "success" })
      : res.status(200).json({ error: "car treatment is not exists in DB." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CAR TREATMENTS
router.get("/get-all", async (req, res) => {
  try {
    const carTreatments = await CarTreatment.find();
    res.status(200).json(carTreatments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE CAR TREATMENT
router.post("/update", async (req, res) => {
  try {
    console.log("add car treatment request: ", req.body);
    var carTreatmentID = req.body._id;
    var carTreatment = await CarTreatment.findByIdAndUpdate(
      {
        _id: carTreatmentID,
      },
      {
        treatmentInformation: req.body.treatmentInformation,
        date: Date.now(),
        workerEmail: req.body.workerEmail,
        carNumber: req.body.carNumber,
      },
      { new: true }
    );
    console.log(carTreatment);
    res.status(200).json(carTreatment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
