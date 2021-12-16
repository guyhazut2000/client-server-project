const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const CarTreatmentSchema = new mongoose.Schema(
  {
    number: { type: Number },
    info: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    workerEmail: { type: String, required: true },
    carNumber: { type: String, required: true },
  },
  { collection: "carTreatments" },
  { timestamps: true }
);

CarTreatmentSchema.plugin(AutoIncrement, {
  id: "number_seq",
  inc_field: "number",
});

module.exports = mongoose.model("CarTreatment", CarTreatmentSchema);
