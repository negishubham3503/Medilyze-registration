import React, { useRef, useState, useEffect } from "react";
import './login.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import logo from "../../images/logo.png";
import containerImage from "../../images/7882.png"
import { useAuth } from "../../contexts/AuthContext";
import { checkUser } from "../../contexts/FirestoreContext";


import { useHistory } from "react-router-dom";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, logout, getUID } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            const UID = getUID();
            const status = await checkUser(UID)
            console.log(status);
            if (status == 'registered-registrar') {
                history.push("/patientRegistration")
            }
            else if (status == 'registered-verifier') {
                history.push("/registrationList")
            }
            else {
                setError("User not permitted to login");
                logout()
            }

        } catch (e) {
            if (e.code === 'auth/wrong-password') {
                console.log("Password is incorrect");
                setError("Password is incorrect");
            }
            else if (e.code === 'auth/invalid-email') {
                console.log("User does not exist");
                setError("User does not exist");
            }
        }

        setLoading(false)
    }
    return (
        <div className="container">

            <div className="content">
                <img src={logo} alt="logo" className="logo-image" />
                <div className="headings">
                    <Typography className="heading" component="h2" variant="h3">
                        Registrar and Verifier Login
                    </Typography>
                    <Typography className="head-desc" component="h1" variant="h6">
                        Enter your credentials below
                    </Typography>
                </div>
                <form className="otp-form-container" noValidate onSubmit={handleSubmit}>
                    {error && <Alert severity="error" style={{ marginBottom: "1rem", width: "29.5rem" }}>{error}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="uid"
                                label="Email Address"
                                type="email"
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
                                type="password"
                                id="password"
                                type="password"
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
        </div >
    )
}