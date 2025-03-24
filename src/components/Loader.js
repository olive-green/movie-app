import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
