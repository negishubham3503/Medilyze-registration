import React, { useState, useEffect } from 'react';
import './RegistrationList.css';
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ForumIcon from '@material-ui/icons/Forum';
import { DataGrid } from '@material-ui/data-grid';
import { Avatar, Badge, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fetchRegistrationRecords } from "../../contexts/FirebaseDatabaseContext";


export default function RegistrationList() {
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("Default");
    const [records, setRecords] = useState({})

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const data = await fetchRegistrationRecords();
            setRecords(data)
            // console.log(data);
        }
        fetchData();

    }, [records])

    function handleLogout() {

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'dateOfRegistration', headerName: 'Date of Registration', width: 130 },
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'dob', headerName: 'Date of Birth', width: 150 },
        { field: 'registrarName', headerName: 'Registrar Name', width: 160 },
        { field: 'registrarID', headerName: 'Registrar ID', width: 150 },
        { field: 'poi', headerName: 'PoI', width: 150 },
        { field: 'poiID', headerName: 'PoI ID', width: 150 },

    ];

    var rows = []

    for (var i = 2; i < records.length; i++) {
        var name = records[i]['firstName'] + " " + records[i]['lastName']
        rows.push({ id: records[i]['uid'], dateOfRegistration: records[i]['registrationDate'], name: name, dob: records[i]['dob'], registrarName: records[i]['registrarName'], registrarID: records[i]['registrarID'], poi: records[i]['poi'], poiID: records[i]['poiNumber'] })
        console.log()
    }


    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    return (
        <div className="container-list">
            <div className="navbar-list">
                <AccountCircleIcon style={{ marginRight: "0.4rem" }} />
                <Typography style={{ marginRight: "2rem" }}>
                    Admin Name
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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    autoHeight
                    rowHeight={75}
                    headerHeight={75}
                    rowsPerPageOptions={[5, 10, 15]}
                />
            </div>
        </div>
    )
}