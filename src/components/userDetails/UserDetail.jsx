import React, { useState } from 'react';
import './userDetail.css';
import { updateStatus } from "../../contexts/FirebaseDatabaseContext.js"
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Avatar, Grid, Paper, Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import CreateUser from "../../contexts/CreateNewUserContext";
import axios from 'axios';


export default function UserDetail(props) {
    const approve = async () => {
        await updateStatus(props.data.uid, 'approved');
        const password = await CreateUser(props.data.email);
        console.log(password);
        // Send E-mail
        axios.post(
            "https://stormy-falls-67781.herokuapp.com/mail",
            {
                "email": props.data.email,
                "message": "Dear " + props.data.firstName + ",\nYour data has been verified by the authorities. Your Patient ID is PID. You can login using:\nEmail: " + props.data.email + "\nPassoword: " + password,
                "subject": "Patient ID Verified"
            }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }
        )
            .then(async (res) => {
                console.log(res.status);
            })
        props.statusFunc(false);
    };
    const reject = async () => {
        await updateStatus(props.data.uid, 'rejected');
        props.statusFunc(false);
    };
    const userImg = "";
    return (
        <div className="user-container">
            <Grid container spacing={2}>
                <Grid container item xs={12} spacing={1}>
                    <Grid container item xs={3}>
                        <Paper className="paper" elevation={1} style={{ width: "100%", textAlign: "-webkit-center" }}>
                            <Avatar src={props.data.imageUrl} id="user-detail-image" />
                            <Typography variant="h6" style={{ color: "#132636" }}>
                                <strong>{props.data.firstName + " " + props.data.middleName + " " + props.data.lastName}</strong>
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: "#AFB7BD" }}>
                                {props.data.email}
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: "#132636" }}>
                                {props.data.phone}
                            </Typography>
                            <Button variant="contained" id="send-message">
                                Send Message
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid container item xs={9}>
                        <Paper className="paper-detail" elevation={1} style={{ width: "100%", color: "#6D7682" }}>
                            <Grid container spacing={3}>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Date of Birth
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.dob}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Father's Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.fatherName}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Mother's Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.motherName}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Gender
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.gender}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Emergency Contact Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.emergencyContact}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Emergency Contact Person
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.emergencyPerson}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Street Address
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.address1 + ", " + props.data.address2}</strong>
                                    </Typography>
                                </Grid>




                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        City
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.city}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        PIN Code
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.pincode}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Country
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.country}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Marital Status
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.maritalStatus}</strong>
                                    </Typography>
                                </Grid>
                                {props.data.maritalStatus == "married" ?
                                    <Grid container item xs={4} id="user-detail-personal">
                                        <Typography variant="subtitle2">
                                            Spouse Name
                                </Typography>
                                        <Typography variant="subtitle2">
                                            <strong>{props.data.spouseName}</strong>
                                        </Typography>
                                    </Grid> :
                                    <Grid >

                                    </Grid>}
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Registration Date
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.registrationDate}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Blood Group
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.bloodGroup}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Proof of Identity
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.poi}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Proof of Identity Document Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.poiNumber}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Verification Status
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.verification}</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} style={{ marginTop: "0.5rem" }}>
                        <Paper className="paper-detail" elevation={1} style={{ width: "100%" }}>
                            <Typography variant="subtitle1" style={{ marginBottom: "1rem" }}>
                                <strong>Insurance Details</strong>
                            </Typography>
                            <Grid container spacing={3} style={{ backgroundColor: "#F2F5F9", padding: "1rem" }}>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Insurance Company Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.insuranceCompany}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Insured Organization Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.organizationName}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Health Card Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.healthCardNumber}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Policy Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.policyNumber}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Valid Upto
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>{props.data.insuranceValidity}</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {props.data.verification == "rejected" ?

                    <Grid container item xs={4} id="user-detail-personal">
                        <Button onClick={approve} variant="contained" color="primary" size="large" style={{ position: "relative", left: "32rem" }}>
                            Approve
                        </Button>
                    </Grid>
                    :
                    props.data.verification == "approved" ?
                        <div>
                        </div> :
                        <Grid container item xs={4} id="user-detail-personal">
                            <Button onClick={approve} variant="contained" color="primary" size="large" style={{ position: "relative", left: "25rem" }}>
                                Approve
                    </Button>
                            <Button onClick={reject} variant="contained" color="secondary" size="large" style={{ position: "relative", left: "34rem" }}>
                                Reject
                    </Button>
                        </Grid>


                }


            </Grid>

        </div >
    )
}