import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

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

function Sidebar({ isDrawerOpen }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const toggleListItem = () => {
  //   setOpen(!open);
  //   console.log("Open : ", open);
  // };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {SidebarData.map((item, key) => (
        <SubMenu isDrawerOpen={isDrawerOpen} item={item} key={key} />
      ))}
    </List>
  );
}

export default Sidebar;
