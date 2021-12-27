import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import WorkerDataService from "../services/Worker";

const AddCarTreatmentForm = (props) => {
  const [treatmentInformation, setTreatmentInformation] = useState("");
  const [carNumber, setCarNumber] = useState("");
  let workerEmail = props.workerEmail;
  let history = useHistory();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    // validate fields
    if (treatmentInformation === "") {
      Swal.fire(
        "Treatment Information Field Error",
        "Treatment Information field is empty.",
        "error"
      );
      return;
    }
    if (carNumber === "") {
      Swal.fire(
        "Car Number Field Error",
        "Car Number field is empty.",
        "error"
      );
      return;
    }
    if (isNaN(carNumber) || parseInt(carNumber) <= 0) {
      Swal.fire(
        "Car Number Field Error",
        "Please Enter Positive Numbers only.",
        "error"
      );
      return;
    }
    // add new car treatment
    try {
      var data = {
        treatmentInformation: treatmentInformation,
        workerEmail: workerEmail,
        carNumber: carNumber,
      };
      const result = await WorkerDataService.addCarTreatment(data);
      if (result.data === null) {
        Swal.fire(
          "Error",
          "Failed to add new Car Treatment information.",
          "error"
        );
        return;
      }
      // if succeed
      // display msg
      Swal.fire({
        icon: "success",
        title: "Car Treatment Success",
        text: "Car Treatment information added successfully to DB. Moving to Data Table...",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        history.push("/dashboard/data-table");
        return;
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="add-form mx-5 my-5">
          <form>
            <h1>Add Form</h1>
            <hr />
            <br />
            <div className="add-form-group">
              <label htmlFor="">Treatment Information:</label>
              <input
                type="text"
                className="form-control item"
                id="treatmentInformation"
                placeholder="Enter Treatment Information"
                required
                onChange={(e) => {
                  setTreatmentInformation(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="add-form-group">
              <label htmlFor="">Car Number:</label>
              <input
                type="text"
                className="form-control item"
                id="carNumber"
                placeholder="Enter Car number"
                required
                onChange={(e) => {
                  setCarNumber(e.target.value);
                }}
              />
            </div>
            <br />
            <br />
            <br />
            <button
              className="btn btn-lg btn-primary text-white"
              onClick={(e) => {
                handleSubmitClick(e);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarTreatmentForm;
