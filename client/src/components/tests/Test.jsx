import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const Test = () => {
  const products = [
    {
      treatmentNumber: "1",
      treatmentInformation: "1323",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "2",
      treatmentInformation: "123",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "1",
      treatmentInformation: "1323",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "2",
      treatmentInformation: "123",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "1",
      treatmentInformation: "1323",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "2",
      treatmentInformation: "123",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "1",
      treatmentInformation: "1323",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
    {
      treatmentNumber: "2",
      treatmentInformation: "123",
      date: "123123123",
      workerEmail: "guy@gmail.com",
      carNumber: "1",
    },
  ];
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
    },
    {
      dataField: "action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <button onClick={() => console.log("test")}>Edit</button>
            <button onClick={() => console.log("test")}>Delete</button>
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
        value: products.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <div>
      <ToolkitProvider keyField="id" data={products} columns={columns} search>
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
            <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
          </div>
        )}
      </ToolkitProvider>
      ;
    </div>
  );
};

export default Test;
