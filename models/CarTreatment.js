const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const CarTreatmentSchema = new mongoose.Schema(
  {
    treatmentNumber: { type: Number, unique: true },
    treatmentInformation: { type: String, required: true },
    date: { type: Date, default: Date.now },
    workerEmail: { type: String, required: true },
    carNumber: { type: String, required: true },
  },
  { collection: "carTreatments" },
  { timestamps: true }
);

CarTreatmentSchema.plugin(AutoIncrement, {
  id: "treatmentNumber_seq",
  inc_field: "treatmentNumber",
});

module.exports = mongoose.model("CarTreatment", CarTreatmentSchema);
