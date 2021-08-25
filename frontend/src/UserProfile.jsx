import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import userPic from "./user-pic.jpg";
import UserProfileSidebar from "./UserProfileSidebar";

import GeneralSettings from "./user/GeneralSettings/GeneralSettings";
import Aliases from "./user/Aliases/Aliases";
import GmailSettings from "./user/GmailSettings/GmailSettings";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    borderLeft: "1px solid rgba(0,0,0,.12)",
    // textAlign: "center",
    // color: theme.palette.text.secondary,
  },
  dFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    marginRight: "40px",
  },
  userImage: {
    // width: "100%",
    height: "125px",
    borderRadius: "50%",
    border: "1px solid black",
  },
}));

function UserProfile({ history, match, location, user }) {
  console.log("ID -------->", user || match?.params?.id);
  const classes = useStyles();

  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [data, setData] = useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const id = match?.params?.id || user;
    fetch(`http://localhost:9000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setData(data.result);
      });
  }, [match?.params?.id, user]);

  const showMainContent = () => {
    switch (selectedIndex) {
      case 0:
        return <GeneralSettings data={data} />;

      case 1:
        return <Aliases />;

      case 2:
        return <GmailSettings data={data} id={data.id} />;

      default:
        return <GeneralSettings data={data} />;
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.dFlex} component={Box} py={1}>
              <div className={classes.dFlex}>
                {location?.state === "grid" && (
                  <div>
                    <Tooltip title="Back to All Users">
                      <IconButton
                        aria-label="back"
                        component="span"
                        onClick={() => history.goBack()}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
                <div className={classes.column} style={{ display: "flex" }}>
                  <img
                    src={userPic}
                    alt="Profile Pic"
                    className={classes.userImage}
                  />
                  {/* </div>
              <div className={classes.column}> */}
                  <div style={{ marginLeft: "20px" }}>
                    <Typography variant="h5">{data?.name?.fullName}</Typography>
                    <Divider variant="middle" />
                    <Typography variant="body1" paragraph>
                      {data.primaryEmail}
                    </Typography>
                    <Typography variant="subtitle2">
                      Organization:&nbsp;
                      <Typography variant="body2" display="inline">
                        {data.orgUnitPath}
                      </Typography>
                    </Typography>
                  </div>
                </div>
                <div className={classes.column}>
                  <Typography variant="subtitle2">
                    Created Time:&nbsp;&nbsp;&nbsp;
                    <Typography variant="body2" display="inline">
                      {new Date(data.creationTime).toLocaleString()}
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle2">
                    Last Signed In:&nbsp;&nbsp;
                    <Typography variant="body2" display="inline">
                      {new Date(data.lastLoginTime).toLocaleString()}
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle2">
                    Two-Step Authentication:&nbsp;&nbsp;
                    <Typography variant="body2" display="inline">
                      {data.isEnrolledIn2Sv ? "Yes" : "No"}
                    </Typography>
                  </Typography>
                </div>
                <div style={{ marginRight: "10px" }}>
                  <Typography variant="subtitle2">Storage:</Typography>
                </div>
                <div className={classes.column}>
                  <Typography variant="body2">Email Usage: 0.00 GB</Typography>
                  <Typography variant="body2">Drive Usage: 0.62 GB</Typography>
                  <Typography variant="body2">
                    Total Storage: 0.00 GB
                  </Typography>
                </div>
              </div>
              <div>
                <Tooltip title="Delete User">
                  <IconButton size="small" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reports">
                  <IconButton size="small" aria-label="assessment">
                    <AssessmentIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container spacing={3}>
                <Slide
                  direction="right"
                  in={showSidebar}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid
                    item
                    sm={2}
                    style={{
                      borderRight: "1px solid rgba(0,0,0,.12)",
                      paddingLeft: "2rem",
                    }}
                  >
                    <UserProfileSidebar
                      selectedIndex={selectedIndex}
                      handleListItemClick={handleListItemClick}
                    />
                    {/* <UserAccordion /> */}
                  </Grid>
                </Slide>

                <Grid item sm={10} style={{ paddingLeft: "1rem" }}>
                  <IconButton
                    size="small"
                    aria-label="assessment"
                    onClick={() => {
                      setShowSidebar(!showSidebar);
                    }}
                  >
                    {showSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                  {showMainContent()}
                  {/* <UserAccordion /> */}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default UserProfile;
