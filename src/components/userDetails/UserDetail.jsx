import React, { useState } from 'react';
import './userDetail.css';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Avatar, Grid, Paper, Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';

export default function UserDetail(props) {
    const userImg = "";
    return (
        <div className="user-container">
            <Grid container spacing={2}>
                <Grid container item xs={8} spacing={1}>
                    <Grid container item xs={4}>
                        <Paper className="paper" elevation={1} style={{width: "100%", textAlign: "-webkit-center"}}>
                            <Avatar src={userImg} id="user-detail-image" />
                            <Typography variant="h6" style={{color: "#132636"}}>
                                <strong>Diane Cooper</strong>
                            </Typography>
                            <Typography variant="subtitle2" style={{color: "#AFB7BD"}}>
                                diane_cooper@medilyze.com
                            </Typography>
                            <Typography variant="subtitle2" style={{color: "#132636"}}>
                                21, Female
                            </Typography>
                            <Button variant="contained" id="send-message">
                                Send Message
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid container item xs={8}>
                        <Paper className="paper-detail" elevation={1} style={{width: "100%", color: "#6D7682"}}>
                            <Grid container spacing={3}>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Marital Status
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Unmarried</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Birthday
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Feb 24th, 1997</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>(+91)9876543210</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Street Address
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>JL Dipanegard No. 21</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        City
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Cilacap</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        PIN Code
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>655849</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Member Status
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Active Member</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Registered Date
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Feb 24th, 2019</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Blood Group
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>AB+</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} style={{marginTop: "0.5rem"}}>
                        <Paper className="paper-detail" elevation={1} style={{width: "100%"}}>
                            <Typography variant="subtitle1" style={{marginBottom: "1rem"}}>
                                <strong>Insurance Details</strong>
                            </Typography>
                            <Grid container spacing={3} style={{backgroundColor: "#F2F5F9", padding: "1rem"}}>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Company Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Vijay Mallya Healthcare</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Organization Name
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Kingfisher</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Health Card Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>9876543210</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Policy Number
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>VM128244274</strong>
                                    </Typography>
                                </Grid>
                                <Grid container item xs={4} id="user-detail-personal">
                                    <Typography variant="subtitle2">
                                        Valid Upto
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>30th Feb 3000</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item xs={4} spacing={2}>
                    <Grid container item xs={12}>
                        <Paper elevation={1} style={{width: "100%"}} style={{padding: "0.4rem"}}>
                            <div style={{display: "flex", padding: "0.6rem"}}>
                                <Typography variant="subtitle1" style={{color: "#132636"}}>
                                    <strong>Notes</strong>
                                </Typography>
                                <Typography variant="subtitle2" color="primary" style={{marginTop: "0.25rem", marginLeft: "14rem"}}>
                                    See all
                                </Typography>
                            </div>
                            <div className="notes-details">
                                <List>
                                    <ListItem style={{padding: "0.3rem"}}>
                                        <ListItemText style={{fontSize: "0.7rem"}}>
                                            This patient is 
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem style={{padding: "0.3rem"}}>
                                        <ListItemText style={{fontSize: "0.7rem"}}>
                                            lorem ipsum 
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem style={{padding: "0.3rem"}}>
                                        <ListItemText style={{fontSize: "0.7rem"}}>
                                            has allergic history
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                <Button variant="contained" color="primary" size="small" style={{marginLeft: "15rem"}}>
                                    Save
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className="paper" elevation={1} style={{width: "100%"}}>
                            <div style={{display: "flex", padding: "0.6rem"}}>
                                <Typography variant="subtitle1" style={{color: "#132636"}}>
                                    <strong>Files/Documents</strong>
                                </Typography>
                                <PostAddIcon color="primary" style={{marginLeft: "5rem"}} />
                                <Typography variant="subtitle2" color="primary" style={{marginTop: "0.25rem"}}>
                                    Add Files
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}