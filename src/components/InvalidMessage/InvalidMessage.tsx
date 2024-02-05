import React from "react";

function InvalidMessage({ message }: { message: string }) {
  if (message.length <= 0) return null;

  return (
    <React.Fragment>
      <ErrorIcon />
      <span>{message}</span>
    </React.Fragment>
  );
}

function ErrorIcon() {
  return <span className="material-icons">error</span>;
}

export default InvalidMessage;
