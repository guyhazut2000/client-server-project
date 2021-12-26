const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/user");
const carTreatmentRoute = require("./routes/carTreatment");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoute);
// app.use("/api/car-treatments", carTreatmentRoute);
app.use("/users", userRoute);
app.use("/car-treatments", carTreatmentRoute);
app.use("*", (req, res) => res.status(404).json({ error: "page not found" }));

//start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port " + process.env.PORT);
});
