import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import UserAccordion from "../../UserAccordion";
import AccountDelegation from "./AccountDelegation";
import Filters from "./Filters";
import SendAs from "./SendAs";
import Labels from "./Labels";
import PopSettings from "./PopSettings";
import ImapSettings from "./ImapSettings";
import VacationResponder from "./VacationResponder";
import Forwarding from "./Forwarding";
import ForwardingAddresses from "./ForwardingAddress";
import Signatures from "./Signatures";

const menu = [
  "Account Delegation",
  "Filters",
  "Send As",
  "Labels",
  "Pop Settings",
  "Imap Settings",
  "Vacation Responder",
  "Forwarding",
  "Forwarding Addresses",
  "Signatures",
];

function GmailSettings() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="Aliases">
      <UserAccordion>
        <div className="sidebar">
          <List component="nav">
            {menu.map((item, index) => (
              <ListItem
                key={index}
                button
                dense={true}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <p>{item}</p>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="main">
          {selectedIndex === 0 && <AccountDelegation />}
          {selectedIndex === 1 && <Filters />}
          {selectedIndex === 2 && <SendAs />}
          {selectedIndex === 3 && <Labels />}
          {selectedIndex === 4 && <PopSettings />}
          {selectedIndex === 5 && <ImapSettings />}
          {selectedIndex === 6 && <VacationResponder />}
          {selectedIndex === 7 && <Forwarding />}
          {selectedIndex === 8 && <ForwardingAddresses />}
          {selectedIndex === 9 && <Signatures />}
        </div>
      </UserAccordion>
    </div>
  );
}

export default GmailSettings;
