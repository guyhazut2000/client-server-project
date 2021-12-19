import React from "react";

const PageNotFound = () => {
  return (
    <div className="page-not-found d-flex flex-column m-5 p-5 align-items-center">
      <h1>404</h1>
      <h3> page not found</h3>
      <br />
      <br />
      <p>We are sorry but the page you are looking for does not exist.</p>
      <p>
        go back to <a href="/dashboard"> Dashboard Page</a>{" "}
      </p>
    </div>
  );
};

export default PageNotFound;
