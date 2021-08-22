import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MySlate from "./MySlate";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
  selectContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Signatures() {
  const classes = useStyles();
  const [profileField, setProfileField] = useState("");
  const [subtype, setSubtype] = useState("");

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <TextField
        label="Send As Account"
        variant="outlined"
        fullWidth
        size="small"
      />
      <div>
        <Accordion className={classes.root}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              User Profile Fields
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classes.selectContainer}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Profile Field
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profileField}
                  onChange={(e) => handleChange(e, setProfileField)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="instantMessager">Instant Messager</MenuItem>
                  <MenuItem value="Address">Address</MenuItem>
                  <MenuItem value="relation">Relation</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                  <MenuItem value="externalId">External Id</MenuItem>
                  <MenuItem value="website">Website</MenuItem>
                  <MenuItem value="gender">Gender</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Subtype</InputLabel>
                <Select
                  disabled
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subtype}
                  onChange={(e) => handleChange(e, setSubtype)}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Template Field" />
              <Button variant="contained" color="primary" disableElevation>
                Add
              </Button>
              <Typography variant="caption">OR</Typography>
              <Button variant="contained" color="secondary" disableElevation>
                Build Conditional
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Gmail Fields</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classes.selectContainer}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Gmail Field
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profileField}
                  onChange={(e) => handleChange(e, setProfileField)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="instantMessager">Instant Messager</MenuItem>
                  <MenuItem value="Address">Address</MenuItem>
                  <MenuItem value="relation">Relation</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                  <MenuItem value="externalId">External Id</MenuItem>
                  <MenuItem value="website">Website</MenuItem>
                  <MenuItem value="gender">Gender</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Subtype</InputLabel>
                <Select
                  disabled
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subtype}
                  onChange={(e) => handleChange(e, setSubtype)}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Template Field" />
              <Button variant="contained" color="primary" disableElevation>
                Add
              </Button>
              <Typography variant="caption">OR</Typography>
              <Button variant="contained" color="secondary" disableElevation>
                Build Conditional
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <div style={{ height: "10px" }} />
        <MySlate />
      </div>
    </div>
  );
}

export default Signatures;
