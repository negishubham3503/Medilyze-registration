import React, { useRef, useState, useEffect } from "react";
import './login.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';
import logo from "../../images/logo.png";
import containerImage from "../../images/7882.png"
import { useAuth } from "../../contexts/AuthContext";
import { fetchPatientData, fetchDoctorName } from "../../contexts/FirestoreContext";
import { generateOTP } from "../../contexts/FirebaseDatabaseContext";


import { useHistory } from "react-router-dom";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    // const { login, logout, getUID } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [doctorName, setDoctorName] = useState("")
    const history = useHistory()

    // useEffect(() => {
    //     async function fetchData() {
    //         const UID = getUID();
    //         const name = await fetchDoctorName(UID);
    //         setDoctorName(name)
    //     }
    //     fetchData();
    // }, [doctorName])

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //         setError("")
    //         setLoading(true)
    //         // await fetchPatientData(uidRef.current.value)
    //         history.push({ pathname: "/refistra", state: { pid: uidRef.current.value } })
    //     } catch {
    //         setError("Failed to log in")
    //     }

    //     setLoading(false)
    // }

    function handleSubmit() {}

    function handleOTPSend() {}



    async function handleLogout() {
        // setError("")

        // try {
        //     await logout()
        //     history.push("/")
        // } catch {
        //     setError("Failed to log out")
        // }
    }
    return (
        <div className="container">
            <div className="navbar">
                <AccountCircleIcon />
                <Typography id="account-link">
                    admin
                </Typography>
                <Typography>
                    <Link onClick={handleLogout}>
                        Logout
                    </Link>
                </Typography>
            </div>
            <div className="content">
                <img src={logo} alt="logo" className="logo-image" />
                <div className="headings">
                    <Typography className="heading" component="h2" variant="h3">
                        Welcome!
                    </Typography>
                    <Typography className="head-desc" component="h1" variant="h6">
                        Enter your credentials below
                    </Typography>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <form className="otp-form-container" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="uid"
                                label="Email"
                                name="email"
                                color="primary"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                color="primary"
                                inputRef={passwordRef}
                            />
                        </Grid>
                        <Grid container item xs={3}></Grid>
                        <Grid container item xs={3}>
                            <Button
                                type="submit"
                                fullWidth="false"
                                variant="contained"
                                color="primary"
                                size="large"
                                id="submit-form"
                                disabled={loading}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <img src={containerImage} alt="loginPage" className="container-image" />
            </div>
        </div>
    )
}