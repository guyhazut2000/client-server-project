import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import WorkerDataService from "../../services/Worker";

const DeleteButton = (props) => {
  var rowContent = props.row;
  var carTreatmentID = rowContent._id;

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // delete car treatment from DB.
          var data = { _id: carTreatmentID };
          WorkerDataService.deleteCarTreatmentByID(data).then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You have deleted the row successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button
      onClick={(e) => {
        handleDeleteClick(e);
      }}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
