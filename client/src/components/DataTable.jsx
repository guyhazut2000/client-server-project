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
import UpdateButton from "./buttons/UpdateButton";
import DeleteButton from "./buttons/DeleteButton";
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const DataTable = () => {
  console.log("data table is rendered");
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
    },
    {
      dataField: "workerEmail",
      text: "Worker Email",
      sort: true,
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
    },
    {
      dataField: "action",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-row">
            <UpdateButton row={row} workerEmail="guysdfsfd@gmail.com" />
            <DeleteButton row={row} />
          </div>
        );
      },
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
    <div>
      <ToolkitProvider
        keyField="id"
        data={carTreatments}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar {...props.searchProps} />
            <ClearSearchButton {...props.searchProps} />
            <hr />
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
            <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default DataTable;
