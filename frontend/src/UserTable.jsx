import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import UserProfile from "./UserProfile";
import { Grid } from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function createData(userEmail, username, orgUnit) {
  return { userEmail, username, orgUnit };
}

// const rows = [
//   createData("john@edu.cloudware.tn", "John Doe", "Dev"),
//   createData("alpha@edu.cloudware.tn", "Alpha Beta", "Dev"),
//   createData("chromeboxmini@", "ChromeBox Mini", "Test Org"),
//   createData("joe@edu.cloudware.tn", "Joe Doe", "Dev"),
//   createData("beta@edu.cloudware.tn", "Alpha Beta", "Dev"),
//   createData("chrome@edu.cloudware.tn", "ChromeBox Mini", "Test Org"),
//   createData("john@edu.cloudware.tn", "John Doe", "Dev"),
//   createData("delta@edu.cloudware.tn", "Alpha Beta", "Dev"),
//   createData("chromebox@edu.cloudware.tn", "ChromeBox Mini", "Test Org"),

//   createData("apha@edu.cloudware.tn", "Alpha Beta", "Dev"),
//   createData("cromeboxmini@sa", "ChromeBox Mini", "Test Org"),
//   createData("jon@edu.cloudware.tn", "John Doe", "Dev"),
//   createData("a@edu.cloudware.tn", "Alpha Beta", "Dev"),
//   createData("c@edu.cloudware.tn", "ChromeBox Mini", "Test Org"),
//   createData("z@edu.cloudware.tn", "ChromeBox Mini", "Test Org"),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "userEmail",
    numeric: false,
    disablePadding: true,
    label: "USER EMAIL",
  },
  { id: "username", numeric: false, disablePadding: false, label: "NAME" },
  {
    id: "orgUnit",
    numeric: false,
    disablePadding: false,
    label: "ORG UNIT NAME",
  },
  { id: "none", numeric: false, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {props.layout === "grid" ? (
          <>
            {headCells.map((headCell, i) => (
              <TableCell
                key={i}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </>
        ) : (
          <TableCell
            key={headCells[0].id}
            align={headCells[0].numeric ? "right" : "left"}
            padding={headCells[0].disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCells[0].id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCells[0].id}
              direction={orderBy === headCells[0].id ? order : "asc"}
              onClick={createSortHandler(headCells[0].id)}
            >
              {headCells[0].label}
              {orderBy === headCells[0].id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User Management
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <ToggleButtonGroup
            value={props.layout}
            exclusive
            onChange={(e, newLayout) => {
              props.setLayout(newLayout);
            }}
            aria-label="table layout"
          >
            <ToggleButton value="grid" aria-label="grid">
              <Tooltip title="Grid">
                <ListIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="pickList" aria-label="pick list">
              <Tooltip title="Pick list">
                <ViewCompactIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function UserTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [layout, setLayout] = React.useState("grid");
  const [user, setUser] = React.useState("");
  const [data, setData] = React.useState("");
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:9000/api/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        console.log(typeof datas);
        setData(datas.result);
        setRows(
          datas.result.map((d) =>
            createData(d.primaryEmail, d.name.fullName, d.orgUnitPath)
          )
        );
        setUser(datas.result[0]["primaryEmail"]);
      });
  }, []);

  const showUserProfile = (row) => {
    // props.history.push(`/userManagement/${row.name}`);
    if (layout === "grid") {
      console.log("GRID");
      props.history.push({
        pathname: `/userManagement/${row.userEmail}`,
        state: layout,
      });
    } else if (layout === "pickList") {
      console.log("pICLLIST");
      console.log("USER ->>", row.userEmail);
      setUser(row.userEmail);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.userEmail);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let totalRows = rows.length;
    let requestedRows = parseInt(event.target.value, 10);
    setRowsPerPage(requestedRows < totalRows ? requestedRows : totalRows);
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const showGrid = () => {
    return (
      <div
        className={classes.root}
        style={{ border: "1px solid rgba(0,0,0,.12)" }}
      >
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            layout={layout}
            setLayout={setLayout}
          />
          <TableContainer style={{ overflowX: "hidden" }}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                layout={layout}
              />

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.userEmail);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell
                          onClick={(event) => handleClick(event, row.userEmail)}
                          padding="checkbox"
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => showUserProfile(row)}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.userEmail}
                        </TableCell>
                        {layout === "grid" && (
                          <>
                            <TableCell onClick={() => showUserProfile(row)}>
                              {row.username}
                            </TableCell>
                            <TableCell onClick={() => showUserProfile(row)}>
                              {row.orgUnit}
                            </TableCell>
                            <TableCell
                              onClick={() => showUserProfile(row)}
                            ></TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ overflowX: "hidden" }}
          />
        </Paper>
        <FormControlLabel
          style={{ marginLeft: "0.1rem" }}
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    );
  };

  const showPickList = () => {
    return (
      <Grid container>
        <Grid item xs={4}>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                layout={layout}
                setLayout={setLayout}
              />
              <TableContainer style={{ overflowX: "hidden" }}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    layout={layout}
                  />

                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.username);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            key={index}
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                          >
                            <TableCell
                              onClick={(event) =>
                                handleClick(event, row.username)
                              }
                              padding="checkbox"
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            <TableCell
                              onClick={() => showUserProfile(row)}
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.userEmail}
                            </TableCell>
                            {layout === "grid" && (
                              <>
                                <TableCell onClick={() => showUserProfile(row)}>
                                  {row.calories}
                                </TableCell>
                                <TableCell onClick={() => showUserProfile(row)}>
                                  {row.fat}
                                </TableCell>
                                <TableCell
                                  onClick={() => showUserProfile(row)}
                                ></TableCell>
                              </>
                            )}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ overflowX: "hidden" }}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <UserProfile user={user} />
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={!data}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {layout === "grid"
        ? showGrid()
        : // <Grid container>
          //   <Grid item xs={4}>
          //     {showGrid()}
          //   </Grid>
          //   <Grid item xs={8}>
          //     <UserProfile />
          //   </Grid>
          // </Grid>
          showPickList()}
    </>
  );
}
