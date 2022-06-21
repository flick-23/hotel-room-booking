import React from "react";
import Alert from "react-bootstrap/Alert";

function Error() {
  return (
    <div>
      {" "}
      <Alert key="danger" variant="danger">
        Something went wrong, please try again later!
      </Alert>
    </div>
  );
}

export default Error;
