import { useHistory } from "react-router-dom";
import "../css/dataTable.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Type } from "react-bootstrap-table2-editor";
import WorkerDataService from "../services/Worker";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useSelector } from "react-redux";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

// display data table component
const DataTable = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  let history = useHistory();
  console.log("data table is rendered");
  // Delete Button
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
            console.log(data);
            WorkerDataService.deleteCarTreatmentByID(data).then((res) => {
              refreshTable();
              console.log(res.data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have deleted the row successfully",
                showConfirmButton: false,
                timer: 1000,
              });
              setTimeout(() => {
                // window.location.reload();
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
  // Update Button
  const UpdateButton = (props) => {
    var rowContent = props.row;
    //   console.log("row data :", rowContent);
    var workerEmail = user.data.email;

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
          if (document.getElementById("carTreatmentInformation").value === "") {
            Swal.showValidationMessage(
              "Car Treatment Information field is empty"
            );
          }
          if (document.getElementById("carNumber").value === "") {
            Swal.showValidationMessage("Car Number field is empty");
          }
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
              workerEmail: user.data.email,
              carNumber: formValues[1],
            });
          if (updatedCarTreatment.data !== null) {
            refreshTable();
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
  // refresh data table
  const refreshTable = async () => {
    try {
      var res = await WorkerDataService.getAllCarTreatments();
      if (res.data !== null) {
        console.log(res.data);
        setCarTreatments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // set car treatments object
  const [carTreatments, setCarTreatments] = useState([]);
  // fetch car treatments
  useEffect(() => {
    const getCarTreatments = async () => {
      try {
        var res = await WorkerDataService.getAllCarTreatments();
        if (res.data !== null) {
          console.log(res.data);
          setCarTreatments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCarTreatments();
  }, []);
  // get all car treatments data

  // console.log(carTreatments);
  const columns = [
    {
      dataField: "treatmentNumber",
      text: "Treatment Number",
      sort: true,
      searchable: false,
    },
    {
      dataField: "treatmentInformation",
      text: "Treatment Information",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
      formatter: (cell) => {
        const time = moment(cell);
        return time.format("DD/MM/YY HH:mm");
      },
      editor: {
        type: Type.DATE,
      },
      sort: true,
      searchable: false,
    },
    {
      dataField: "workerEmail",
      text: "Worker Email",
      sort: true,
      searchable: false,
    },
    {
      dataField: "carNumber",
      text: "Car Number",
      sort: true,
      // Perform a sorting
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === "asc") {
          return a - b;
        }
        return b - a; // desc
      },
      searchable: false,
    },
    {
      dataField: "action",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-row">
            <UpdateButton row={row} />
            <DeleteButton row={row} />
          </div>
        );
      },
      searchable: false,
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: carTreatments.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <div className="container">
      <ToolkitProvider
        keyField="id"
        data={carTreatments}
        columns={columns}
        search
      >
        {(props) => (
          <>
            <h3>Input something at below input field:</h3>
            <div className="row">
              <div className="col-10">
                <SearchBar {...props.searchProps} />
                <ClearSearchButton
                  className="btn btn-clear btn-lg btn-block btn-secondary mx-3 "
                  {...props.searchProps}
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-add btn-lg btn-block btn-primary  mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/dashboard/add-data");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <hr />
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
              striped
              hover
              condensed
              wrapperClasses="table table-responsive"
            />
            <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
          </>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default DataTable;
