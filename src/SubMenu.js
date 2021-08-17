import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SubMenu({ item, isDrawerOpen }) {
  console.log("isDrawerOpen : ", isDrawerOpen);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggleListItem = () => {
    isDrawerOpen && setOpen(!open);
    console.log("Open : ", open);
  };

  return (
    <>
      <ListItem button onClick={toggleListItem}>
        <Link
          to={item.path}
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </Link>
        {open ? item.iconUp : item.iconClosed}
      </ListItem>
      {isDrawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subNav.map((subItem, k) => (
              <ListItem key={k} button className={classes.nested}>
                {/* <ListItemIcon>{subItem.}</ListItemIcon> */}
                <Link
                  to={subItem.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItemText secondary={subItem.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default SubMenu;
