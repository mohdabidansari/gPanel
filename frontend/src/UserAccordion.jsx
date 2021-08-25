import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./UserAccordion.css";

function UserAccordion({ children }) {
  const [open, setOpen] = useState(true);
  const collapse = () => {
    console.log("TOGGLE ACCORDION");
    setOpen(!open);
  };
  return (
    <div className="wrapper">
      <div className={open ? "parent show" : "parent"}>
        <div className="content">{children[0]}</div>
      </div>
      {/* <button className="btn" onClick={collapse}>
        Open/Close
      </button> */}
      <div className="mainContent">
        <IconButton size="small" aria-label="assessment" onClick={collapse}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <div>{children[1]}</div>
      </div>
    </div>
  );
}

export default UserAccordion;
