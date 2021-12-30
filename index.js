const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/user");
const carTreatmentRoute = require("./routes/carTreatment");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/car-treatments", carTreatmentRoute);
app.use("*", (req, res) => res.status(404).json({ error: "Page not found" }));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port " + process.env.PORT);
});
