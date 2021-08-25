import React, { useState, useEffect } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";
import MySlate from "./MySlate";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
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

const options = {
  name: ["fullName", "familyName", "givenName"],
  email: ["home", "work", "other", "custom", "primary"],
  phone: ["home"],
  instantMessager: ["message"],
  address: ["home"],
  relation: ["spouse"],
  organization: ["school"],
  externalId: ["id"],
  website: ["website"],
  gender: ["gender"],
};

function Signatures({ data }) {
  // console.log("id ->", id);
  const classes = useStyles();
  const [profileField, setProfileField] = useState("");
  const [subtype, setSubtype] = useState("");
  const [sendAs, setSendAs] = useState("");
  const [userTemplateField, setUserTemplateField] = useState("");
  const [signatureTemplate, setSignatureTemplate] = useState("");
  const [aliases, setAliases] = useState([]);
  const [showUserConditional, setShowUserConditional] = useState(false);
  const [beforeField, setBeforeField] = useState("");
  const [afterField, setAfterField] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/api/aliases/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setAliases(data.result.sendAs);
      });
  }, [data]);

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <TextField
        select
        label="Send As Account"
        variant="outlined"
        fullWidth
        size="small"
        value={sendAs}
        onChange={(e) => handleChange(e, setSendAs)}
      >
        {!!aliases &&
          aliases.map((alias, i) => (
            <MenuItem key={i} value={alias.sendAsEmail}>
              {alias.sendAsEmail}
            </MenuItem>
          ))}
      </TextField>
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
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Box className={classes.selectContainer}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Profile Field
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profileField}
                  onChange={(e) => {
                    setProfileField(e.target.value);
                    setSubtype(options[e.target.value][0]);
                    setUserTemplateField(
                      "{" +
                        e.target.value +
                        "-" +
                        options[e.target.value][0] +
                        "}"
                    );
                  }}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="instantMessager">Instant Messenger</MenuItem>
                  <MenuItem value="address">Address</MenuItem>
                  <MenuItem value="relation">Relation</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                  <MenuItem value="externalId">External Id</MenuItem>
                  <MenuItem value="website">Website</MenuItem>
                  <MenuItem value="gender">Gender</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Subtype</InputLabel>
                <Select
                  value={subtype}
                  onChange={(e) => {
                    setSubtype(e.target.value);
                    setUserTemplateField(
                      "{" + profileField + "-" + e.target.value + "}"
                    );
                  }}
                >
                  {profileField &&
                    options[profileField].map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                label="Template Field"
                value={userTemplateField}
                readOnly
              />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => {
                  if (!!userTemplateField) {
                    setSignatureTemplate(userTemplateField);
                    setProfileField("");
                    setUserTemplateField("");
                    setSubtype("");
                  }
                }}
              >
                Add
              </Button>
              <Typography variant="caption">OR</Typography>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => setShowUserConditional(!showUserConditional)}
              >
                Build Conditional
              </Button>
            </Box>

            {showUserConditional && (
              <Box className={classes.selectContainer}>
                <TextField
                  label="Before Field"
                  value={beforeField}
                  onChange={(e) => setBeforeField(e.target.value)}
                />

                <TextField label="Template Field" value={userTemplateField} />
                <TextField
                  label="After Field"
                  value={afterField}
                  onChange={(e) => setAfterField(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    if (!!userTemplateField) {
                      setSignatureTemplate(
                        beforeField + " " + userTemplateField + " " + afterField
                      );
                      setProfileField("");
                      setUserTemplateField("");
                      setSubtype("");
                      setBeforeField("");
                      setAfterField("");
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
        {/* <Accordion>
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
                  <MenuItem value="address">Address</MenuItem>
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
        </Accordion> */}
        <div style={{ height: "10px" }} />
        <MySlate data={data} sign={signatureTemplate} />
      </div>
    </div>
  );
}

export default Signatures;
