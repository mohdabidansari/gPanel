import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "./Aliases.css";
import UserAccordion from "../../UserAccordion";

function Alias() {
  return <h1>Aliases</h1>;
}

function NonAlias() {
  return <h1>Non Aliases</h1>;
}

function Aliases() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="Aliases">
      <UserAccordion>
        <div className="sidebar">
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              dense={true}
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <p>Aliases</p>
            </ListItem>
            <ListItem
              button
              dense={true}
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <p>Non-Editable Aliases</p>
            </ListItem>
          </List>
        </div>
        <div className="main">
          {selectedIndex === 0 && <Alias />}
          {selectedIndex === 1 && <NonAlias />}
        </div>
      </UserAccordion>
    </div>
  );
}

export default Aliases;
