import React, { useState, useEffect } from 'react';
import './RegistrationList.css';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CloseIcon from '@material-ui/icons/Close';
import ForumIcon from '@material-ui/icons/Forum';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { AppBar, Avatar, Badge, Box, Button, FormControl, Grid, InputAdornment, MenuItem, Select, Tab, Tabs, TextField, Typography, makeStyles, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { fetchRegistrationRecords, getRecord } from "../../contexts/FirebaseDatabaseContext";
import { fetchVerifierData } from "../../contexts/FirestoreContext";
import { useAuth } from "../../contexts/AuthContext";


import UserDetail from '../userDetails/UserDetail';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function RegistrationList() {
    const { login, logout, getUID } = useAuth()

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("Default");
    const [records, setRecords] = useState({})
    const [pendingRows, setPendingRows] = useState([])
    const [approvedRows, setApprovedRows] = useState([])
    const [rejectedRows, setRejectedRows] = useState([])
    const [record, setRecord] = useState({})
    const [verifierName, setVerifierName] = useState("")
    const [verifierID, setVerifierID] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()





    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const data = await fetchVerifierData(UID);
            setVerifierName(data['name'])
            setVerifierID(data['id'])
        }
        fetchData();

    }, [verifierName, verifierID])

    useEffect(() => {
        async function fetchData() {
            const records = await fetchRegistrationRecords();
            let rows = [];
            for (var i = 2; i < records.length; i++) {
                if (records[i]['verification'] == 'approved') {
                    var name = records[i]['firstName'] + " " + records[i]['lastName']
                    rows.push({
                        id: records[i]['uid'],
                        dateOfRegistration: records[i]['registrationDate'],
                        name: name,
                        dob: records[i]['dob'],
                        registrarName: records[i]['registrarName'],
                        registrarID: records[i]['registrarID'],
                        poi: records[i]['poi'],
                        poiID: records[i]['poiNumber'],
                        address1: records[i]['address1'],
                        address2: records[i]['address2'],
                        bloodGroup: records[i]['bloodGroup'],
                        city: records[i]['city'],
                        country: records[i]['country'],
                        email: records[i]['email'],
                        emergencyContact: records[i]['emergencyContact'],
                        emergencyPerson: records[i]['emergencyPerson'],
                        fatherName: records[i]['fatherName'],
                        gender: records[i]['gender'],
                        healthCardNumber: records[i]['healthCardNumber'],
                        insuranceCompany: records[i]['insuranceCompany'],
                        insuranceValidity: records[i]['insuranceValidity'],
                        maritalStatus: records[i]['maritalStatus'],
                        organizationName: records[i]['organizationName'],
                        motherName: records[i]['motherName'],
                        phone: records[i]['phone'],
                        pincode: records[i]['pincode'],
                        policyNumber: records[i]['policyNumber'],
                        spouseName: records[i]['spouseName'],
                        state: records[i]['state'],
                    })
                }
            }
            setApprovedRows(rows);
        }
        fetchData();

    }, [approvedRows])

    useEffect(() => {
        async function fetchData() {
            const records = await fetchRegistrationRecords();
            let rows = [];
            for (var i = 2; i < records.length; i++) {
                if (records[i]['verification'] == 'pending') {
                    var name = records[i]['firstName'] + " " + records[i]['lastName']
                    rows.push({
                        id: records[i]['uid'],
                        dateOfRegistration: records[i]['registrationDate'],
                        name: name,
                        dob: records[i]['dob'],
                        registrarName: records[i]['registrarName'],
                        registrarID: records[i]['registrarID'],
                        poi: records[i]['poi'],
                        poiID: records[i]['poiNumber'],
                        address1: records[i]['address1'],
                        address2: records[i]['address2'],
                        bloodGroup: records[i]['bloodGroup'],
                        city: records[i]['city'],
                        country: records[i]['country'],
                        email: records[i]['email'],
                        emergencyContact: records[i]['emergencyContact'],
                        emergencyPerson: records[i]['emergencyPerson'],
                        fatherName: records[i]['fatherName'],
                        gender: records[i]['gender'],
                        healthCardNumber: records[i]['healthCardNumber'],
                        insuranceCompany: records[i]['insuranceCompany'],
                        insuranceValidity: records[i]['insuranceValidity'],
                        maritalStatus: records[i]['maritalStatus'],
                        organizationName: records[i]['organizationName'],
                        motherName: records[i]['motherName'],
                        phone: records[i]['phone'],
                        pincode: records[i]['pincode'],
                        policyNumber: records[i]['policyNumber'],
                        spouseName: records[i]['spouseName'],
                        state: records[i]['state'],
                    })
                }
            }
            setPendingRows(rows);
        }
        fetchData();

    }, [pendingRows])

    useEffect(() => {
        async function fetchData() {
            const records = await fetchRegistrationRecords();
            let rows = [];
            for (var i = 2; i < records.length; i++) {
                if (records[i]['verification'] == 'rejected') {
                    var name = records[i]['firstName'] + " " + records[i]['lastName']
                    rows.push({
                        id: records[i]['uid'],
                        dateOfRegistration: records[i]['registrationDate'],
                        name: name,
                        dob: records[i]['dob'],
                        registrarName: records[i]['registrarName'],
                        registrarID: records[i]['registrarID'],
                        poi: records[i]['poi'],
                        poiID: records[i]['poiNumber'],
                        address1: records[i]['address1'],
                        address2: records[i]['address2'],
                        bloodGroup: records[i]['bloodGroup'],
                        city: records[i]['city'],
                        country: records[i]['country'],
                        email: records[i]['email'],
                        emergencyContact: records[i]['emergencyContact'],
                        emergencyPerson: records[i]['emergencyPerson'],
                        fatherName: records[i]['fatherName'],
                        gender: records[i]['gender'],
                        healthCardNumber: records[i]['healthCardNumber'],
                        insuranceCompany: records[i]['insuranceCompany'],
                        insuranceValidity: records[i]['insuranceValidity'],
                        maritalStatus: records[i]['maritalStatus'],
                        organizationName: records[i]['organizationName'],
                        motherName: records[i]['motherName'],
                        phone: records[i]['phone'],
                        pincode: records[i]['pincode'],
                        policyNumber: records[i]['policyNumber'],
                        spouseName: records[i]['spouseName'],
                        state: records[i]['state'],
                    })
                }
            }
            setRejectedRows(rows);
        }
        fetchData();

    }, [rejectedRows])

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'dateOfRegistration', headerName: 'Date of Registration', width: 120 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'registrarName', headerName: 'Registrar Name', width: 160 },
        { field: 'registrarID', headerName: 'Registrar ID', width: 150 },
        { field: 'poi', headerName: 'PoI', width: 150 },
        { field: 'poiID', headerName: 'PoI ID', width: 150 },
        {
            field: "verification",
            headerName: " ",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                        setOpen(true);
                    });
                    const data = await getRecord(thisRow['id']);
                    setRecord(data);

                };

                return (
                    <div>
                        <Button variant="contained" color="secondary" onClick={onClick}>View</Button>
                        <Dialog open={open} aria-labelledby="user-detail" fullWidth maxWidth="xl" style={{ padding: "0rem 4rem 0rem 3rem" }}>
                            <DialogTitle className="dialog-title" style={{ color: "#132636", backgroundColor: "#F2F5F9" }}>
                                <PersonOutlineIcon fontSize="large" style={{ marginBottom: "-0.5rem", marginRight: "0.4rem" }} color="primary" />
                                <Typography variant="h5" style={{ display: "contents" }}>
                                    <strong>Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                </Typography>
                                <Button style={{ borderRadius: "40%", marginLeft: "55rem" }}><CloseIcon onClick={handleClose} /></Button>
                            </DialogTitle>
                            <DialogContent style={{ backgroundColor: "#F2F5F9" }}>
                                <UserDetail data={record} />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
        }

    ];

    return (
        <div className="container-list">
            <div className="navbar-list">
                <AccountCircleIcon style={{ marginRight: "0.4rem" }} />
                <Typography style={{ marginRight: "2rem" }}>
                    {verifierName}
                </Typography>
                <Typography>
                    <Link onClick={handleLogout}>
                        Logout
                    </Link>
                </Typography>
            </div>
            <div className="content-navbar">
                <Typography variant="h5" style={{ color: "#132636" }}>
                    <strong>In Patient Counselling</strong>
                </Typography>
                <div className="header-icons">
                    <Badge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} style={{ color: "#67D57F" }}>
                        <Avatar src="" style={{ height: "1.5rem", width: "1.5rem", marginRight: "1.8rem" }} />
                    </Badge>
                    <Badge badgeContent={4} color="secondary" style={{ marginRight: "1.8rem" }}>
                        <NotificationsActiveIcon />
                    </Badge>
                    <Badge badgeContent={5} color="primary">
                        <ForumIcon />
                    </Badge>
                </div>
            </div>
            <div className="content-list">
                <Grid container spacing={2}>
                    <Grid container item xs={8}>
                        <TextField
                            className="search-bar"
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: "#939393" }} />
                                    </InputAdornment>
                                ),
                            }}
                            style={{
                                backgroundColor: "#EEEEEE",
                                borderRadius: "2rem"
                            }}
                        />
                    </Grid>
                    <Grid container item xs={2}>
                        <Button variant="contained" style={{ backgroundColor: "#F4F4F5", color: "#939393" }} fullWidth>
                            <PrintIcon style={{ marginRight: "1rem" }} />
                            Print All
                        </Button>
                    </Grid>
                    <Grid container item xs={2}>
                        <Button variant="contained" color="primary" fullWidth>
                            <AddIcon style={{ marginRight: "1rem" }} />
                            <strong>Add New</strong>
                        </Button>
                    </Grid>
                </Grid>
                <div className="table-options">
                    <Typography variant="h6">
                        <strong>FILTER</strong>
                    </Typography>
                    <Typography variant="subtitle1" style={{ margin: "0.2rem 0.5rem 0rem 2rem" }} >
                        <b>Date :</b>
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        id="appointment-datetime-local"
                        // label="Select Date and Time"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography variant="subtitle1" style={{ border: "1px solid #DDDDDD", padding: "0.2rem 1.2rem", marginLeft: "1rem" }}>
                        <b>Status</b>
                    </Typography>
                    <FormControl variant="outlined" size="small">
                        <Select
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Verified"}>Verified</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="subtitle1" style={{ border: "1px solid #DDDDDD", padding: "0.2rem 1.2rem", marginLeft: "20rem" }}>
                        <strong>Sort By</strong>
                    </Typography>
                    <FormControl variant="outlined" size="small">
                        <Select
                            id="status"
                            value={sort}
                            onChange={handleSortChange}
                        >
                            <MenuItem value={"Default"}>Default</MenuItem>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Verified"}>Verified</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div style={{ width: '100%', backgroundColor: "white" }}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="registraion-lists" style={{ backgroundColor: "#1990EA" }}>
                        <Tab label="Pending" {...a11yProps(0)} />
                        <Tab label="Approved" {...a11yProps(1)} />
                        <Tab label="Rejected" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <DataGrid
                        rows={pendingRows}
                        columns={columns}
                        pageSize={5}
                        autoHeight
                        rowHeight={60}
                        headerHeight={60}
                        rowsPerPageOptions={[5, 10, 15]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataGrid
                        rows={approvedRows}
                        columns={columns}
                        pageSize={5}
                        autoHeight
                        rowHeight={60}
                        headerHeight={60}
                        rowsPerPageOptions={[5, 10, 15]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DataGrid
                        rows={rejectedRows}
                        columns={columns}
                        pageSize={5}
                        autoHeight
                        rowHeight={60}
                        headerHeight={60}
                        rowsPerPageOptions={[5, 10, 15]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </TabPanel>

            </div>
        </div>
    )
}