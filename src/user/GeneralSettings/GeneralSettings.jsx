import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DomainIcon from "@material-ui/icons/Domain";
import "./GeneralSettings.css";
import Button from "@material-ui/core/Button";

function GeneralSettings() {
  const [isUserActive, setIsUserActive] = useState(true);
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [canShareContact, setCanShareContact] = useState(false);
  const [cPanel, setCPanel] = useState("");
  const [gPanel, setGPanel] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    organization: "",
  });
  const [domain, setDomain] = useState("");

  const handleSwitchChange = () => {
    setIsUserActive(!isUserActive);
  };

  const handleFormChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="GeneralSettings">
      <div className="dFlex" style={{ marginBottom: "40px" }}>
        <div className="aside">
          <h4>Basic Information</h4>
          <button className="button">Advanced Edit</button>
        </div>
        <div className="main">
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>Suspended</p>
            <Switch
              checked={isUserActive}
              onChange={handleSwitchChange}
              color="primary"
              name="checkedB"
            />
            <p>Active</p>
          </div>
          <form>
            <div className="dFlex" style={{ marginBottom: "15px" }}>
              <TextField
                id="firstName"
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleFormChange}
                style={{ marginRight: "20px" }}
              />
              <TextField
                id="lastName"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleFormChange}
              />
            </div>
            <div className="dFlex" style={{ marginBottom: "15px" }}>
              <TextField
                id="username"
                label="Username"
                name="username"
                value={user.username}
                onChange={handleFormChange}
                style={{ marginRight: "20px" }}
              />
              <FormControl style={{ width: "180px" }}>
                <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <MenuItem value={"edu.cloudware.tn"}>
                    edu.cloudware.tn
                  </MenuItem>
                  <MenuItem value={"edu.cloudware.ge"}>
                    edu.cloudware.ge
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="organization"
                label="Organization"
                name="organization"
                value={user.organization}
                onChange={handleFormChange}
                style={{ marginRight: "20px" }}
              />
              <Tooltip title="Browse Organiztions">
                <IconButton aria-label="Browse Organiztions">
                  <DomainIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>
        </div>
      </div>
      <Divider />

      <div
        className="dFlex"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <div className="aside">
          <h4>Password</h4>
        </div>
        <div className="main">
          <div className="dFlex" style={{ alignItems: "center" }}>
            <Checkbox
              color="primary"
              checked={canChangePassword}
              onChange={() => setCanChangePassword(!canChangePassword)}
            />
            <p>Require user to change password at next sign-in.</p>
          </div>
          <TextField type="password" id="newPassword" label="New Password" />
        </div>
      </div>
      <Divider />

      <div
        className="dFlex"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <div className="aside">
          <h4>Contact Sharing</h4>
        </div>
        <div className="main">
          <div className="dFlex" style={{ alignItems: "center" }}>
            <Checkbox
              color="primary"
              checked={canShareContact}
              onChange={() => setCanShareContact(!canShareContact)}
            />
            <p>Automatically share User's contact information.</p>
          </div>
        </div>
      </div>
      <Divider />

      <div
        className="dFlex"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <div className="aside">
          <h4>Roles</h4>
        </div>
        <div className="main">
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>cPanel:&nbsp;&nbsp;&nbsp;&nbsp; </p>
            <FormControl style={{ width: "100px" }}>
              {/* <InputLabel id="demo-simple-select-label">Domain</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cPanel}
                onChange={(e) => setCPanel(e.target.value)}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>gPanel:&nbsp;&nbsp;&nbsp;&nbsp; </p>
            <FormControl style={{ width: "100px" }}>
              {/* <InputLabel id="demo-simple-select-label">Domain</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gPanel}
                onChange={(e) => setGPanel(e.target.value)}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Divider />

      <div
        className="dFlex"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <div className="aside">
          <h4>2-Step Verification</h4>
        </div>
        <div className="main">
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>Verification Enforced:</p>
            <Switch
              //   checked={isUserActive}
              //   onChange={handleSwitchChange}
              color="primary"
              name="checkedB"
            />
          </div>
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>Verification Enrolled:&nbsp;</p>
            <Switch
              //   checked={isUserActive}
              //   onChange={handleSwitchChange}
              color="primary"
              name="checkedB"
            />
          </div>
          <div className="dFlex" style={{ alignItems: "center" }}>
            <p>Backup Codes:&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Button color="primary" size="small" variant="contained">
              Show Backup Codes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralSettings;
