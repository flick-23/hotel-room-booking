import React from "react";
import Alert from "react-bootstrap/Alert";

function Error({ message }) {
  return (
    <div>
      {" "}
      <Alert key="danger" variant="danger">
        {message}
      </Alert>
    </div>
  );
}

export default Error;
