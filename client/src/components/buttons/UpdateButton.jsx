import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import WorkerDataService from "../../services/Worker";

const UpdateButton = (props) => {
  var rowContent = props.row;
  //   console.log("row data :", rowContent);
  var workerEmail = props.workerEmail;

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const htmlUpdateForm = `<div>
       <form> 
      <label for="carTreatmentInformation">Car Treatment Information: </label><br>
      <input type="text" id="carTreatmentInformation" name="carTreatmentInformation"><br><br>
      <label for="carNumber">Car Number:</label><br>
      <input type="text" id="carNumber" name="carNumber" value=${rowContent.carNumber}><br><br>
      </form> 
      </div>`;

    const { value: formValues } = await new Swal({
      title: "Update",
      html: htmlUpdateForm,
      focusConfirm: false,
      preConfirm: () => {
        // validated fields
        if (parseInt(document.getElementById("carNumber").value) < 0) {
          Swal.showValidationMessage("Car Number must be positive!");
        }
        if (isNaN(parseInt(document.getElementById("carNumber").value))) {
          Swal.showValidationMessage("Car Number must be a number!");
        } else {
          //   console.log(parseInt(document.getElementById("carNumber").value));
          return [
            document.getElementById("carTreatmentInformation").value,
            document.getElementById("carNumber").value,
          ];
        }
      },
    });

    if (formValues) {
      console.log(formValues);
      try {
        const updatedCarTreatment =
          await WorkerDataService.updateCarTreatmentByID({
            _id: rowContent._id,
            treatmentInformation: formValues[0],
            workerEmail: workerEmail,
            carNumber: formValues[1],
          });
        if (updatedCarTreatment.data !== null) {
          console.log(updatedCarTreatment);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        // window.location.reload();
        // setTimeout(function () {
        //   // window.location.reload();
        //   // window.location.assign(window.location.href);
        // }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={(e) => {
        handleUpdateClick(e);
      }}
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
};

export default UpdateButton;
