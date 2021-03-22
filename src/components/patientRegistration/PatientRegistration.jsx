import React, { useCallback, useRef, useState, useEffect } from 'react';
import './PatientRegistration.css';
import Logo from '../../images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import Webcam from "react-webcam";
import Alert from '@material-ui/lab/Alert';
import { Button, Grid, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, Input, Checkbox } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchRegistrarData } from "../../contexts/FirestoreContext";
import { getFace } from "../../contexts/FaceDetectionContext";
import { compareFromDatabase, addRegistration, updateFacialRecords } from "../../contexts/FirebaseDatabaseContext";
import * as faceApi from "face-api.js";
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';
import { storage } from "../../components/firebase.js";

export default function PatientRegistration() {
    const { login, logout, getUID } = useAuth()
    const webcamRef = useRef(null);
    const aadharRef = useRef();
    const otpRef = useRef();
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const lastNameRef = useRef();
    const dobRef = useRef();
    const fatherRef = useRef();
    const motherRef = useRef();
    const spouseRef = useRef();
    const poiNumberRef = useRef();
    const insuranceCompanyRef = useRef();
    const organizationRef = useRef();
    const policyNumberRef = useRef();
    const healthCardNumberRef = useRef();
    const validityRef = useRef();
    const emailRef = useRef();
    const mobileRef = useRef();
    const emergencyContactRef = useRef();
    const emergencyContactPersonRef = useRef();
    const cityRef = useRef();
    const addressLine1Ref = useRef();
    const addressLine2Ref = useRef();
    const pincodeRef = useRef();
    const [poi, setPoi] = useState();
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [faceSuccess, setFaceSuccess] = useState(false);
    const [registrarName, setRegistrarName] = useState("")
    const [registrarID, setRegistrarID] = useState("")
    const [gender, setGender] = useState('female');
    const [maritalStatus, setMaritalStatus] = useState('unmarried');
    const [bg, setBG] = useState('');
    const [options, setOptions] = useState('')
    const [state, setState] = useState("");
    const history = useHistory()
    var reg;
    const [random, setRandom] = useState(Math.floor(10000000000 + Math.random() * 90000000000));
    const [imgSrc, setImgSrc] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg");
    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "user"
    };
    const stateList = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];
    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const data = await fetchRegistrarData(UID);
            setRegistrarName(data['name'])
            setRegistrarID(data['id'])
        }
        fetchData();

    }, [registrarName, registrarID])

    useEffect(() => {
        async function fetchData() {
            await faceApi.nets.tinyFaceDetector.load("/models/");
        }
        fetchData();
    }, [])

    const handleRegister = async () => {
        let newDate = new Date()
        await storage.ref('/').child(random + '.jpeg').getDownloadURL().then(url => {
            const data = {

                "uid": random,
                "firstName": firstNameRef.current.value,
                "middleName": middleNameRef.current.value,
                "lastName": lastNameRef.current.value,
                "dob": dobRef.current.value,
                "fatherName": fatherRef.current.value,
                "motherName": motherRef.current.value,
                "gender": gender,
                "maritalStatus": maritalStatus,
                "spouseName": spouseRef.current.value,
                "bloodGroup": bg,
                "poi": poi,
                "poiNumber": poiNumberRef.current.value,
                "insuranceCompany": insuranceCompanyRef.current.value,
                "organizationName": organizationRef.current.value,
                "policyNumber": policyNumberRef.current.value,
                "healthCardNumber": healthCardNumberRef.current.value,
                "insuranceValidity": validityRef.current.value,
                "email": emailRef.current.value,
                "phone": mobileRef.current.value,
                "emergencyContact": emergencyContactRef.current.value,
                "emergencyPerson": emergencyContactPersonRef.current.value,
                "country": "India",
                "state": state,
                "city": cityRef.current.value,
                "address1": addressLine1Ref.current.value,
                "address2": addressLine2Ref.current.value,
                "pincode": pincodeRef.current.value,
                "registrarID": registrarID,
                "registrarName": registrarName,
                "verification": "pending",
                "imageUrl": url,
                "registrationDate": `${newDate.getFullYear()}${'-'}${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`}${'-'}${newDate.getDate()}`
            }
            addRegistration(data);
            setSuccess(false);
        });
    }


    const handleCapture = useCallback(async () => {
        setError("")
        const imageSrc = webcamRef.current.getScreenshot({ width: 300, height: 300 });
        setImgSrc(imageSrc);
        const opt = await getFace();
        if (opt != -999) {
            setOptions(opt);
            console.log(opt);
            setOpen(false);
            console.log(imageSrc)
            const formData = new FormData();
            formData.append('file', imageSrc)
            axios.post(
                "http://0.0.0.0:8080/predict", {
                data: imageSrc, headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then(async (res) => {
                    reg = await compareFromDatabase(res.data);
                    if (reg == "duplicate-registration") {
                        setError("Duplicate Registration")
                        setImgSrc("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg")
                    }
                    else if (reg == "new-registration") {
                        handleFaceSuccessOpen();
                        const uploadTask = await storage.ref(`/`).child(random + '.jpeg').putString(imageSrc.slice(23), 'base64', { contentType: 'image/jpeg' });
                        updateFacialRecords(res.data)

                    }
                })

        }
        else {
            // setError("")
        }
    }, [webcamRef, setImgSrc, options]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccessOpen = () => {
        setSuccess(true);
    }

    const handleSuccessClose = () => {
        setSuccess(false);
    }

    const handleFaceSuccessOpen = () => {
        setFaceSuccess(true);
    }

    const handleFaceSuccessClose = () => {
        setFaceSuccess(false);
    }

    const handleOTPVerify = () => {
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const handleBGChange = (event) => {
        setBG(event.target.value);
    };

    const handlePoiChange = (event) => {
        setPoi(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className="container-registration">
            <img src={Logo} alt="navbar" className="navbar-image" />
            <div className="navbar-registration">
                {/* <Typography style={{ marginRight: "50rem", marginLeft: "0.5rem" }}>
                    Registrar
                </Typography> */}
                <AccountCircleIcon />
                <Typography style={{ marginRight: "2.5rem", marginLeft: "0.5rem" }}>
                    {registrarName}
                </Typography>
                <Typography>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </Typography>
            </div>
            <div className="content-registration">
                {imgSrc && (<img src={imgSrc} className="patient-registration-image" id="webimage" />)}
                <Button variant="contained" onClick={handleClickOpen} color="secondary" className="click-photo-button">
                    Click Picture
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="contact">
                    <DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                <ExitToAppIcon />
                            </Button>
                        </DialogActions>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            videoConstraints={videoConstraints}
                            screenshotFormat="image/jpeg"
                            style={{ position: "relative" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCapture} color="secondary">
                            <PhotoCameraIcon />
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="aadhar-otp">
                    {error && <Alert severity="error" style={{ marginBottom: "1rem", width: "49rem" }}>{error}</Alert>}
                    <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                        Personal Identity
                    </Typography>
                    <form onSubmit={handleOTPVerify}>
                        <Grid container spacing={6}>
                            <Grid container item xs={20}>
                                <Typography variant="h6" style={{ margin: "1rem", color: "black" }}>
                                    Add Patient Details in respective fields only after clicking photograph
                    </Typography>
                            </Grid>

                            <Grid container item xs={6}>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div className="form-container-registration">
                    <form onSubmit={handleRegister}>
                        <div className="patient-details">
                            <Grid container spacing={3}>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="First Name"
                                        size="small"
                                        inputRef={firstNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Middle Name"
                                        size="small"
                                        inputRef={middleNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Last Name"
                                        size="small"
                                        inputRef={lastNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Date of Birth"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        size="small"
                                        inputRef={dobRef}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Father's Name"
                                        size="small"
                                        inputRef={fatherRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Mother's Name"
                                        size="small"
                                        inputRef={motherRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
                                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Marital Status</FormLabel>
                                        <RadioGroup row aria-label="maritalStatus" name="maritalStatus1" value={maritalStatus} onChange={handleMaritalStatusChange}>
                                            <FormControlLabel value="maried" control={<Radio color="primary" />} label="Married" />
                                            <FormControlLabel value="unmarried" control={<Radio color="primary" />} label="Unmarried" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Spouse Name"
                                        size="small"
                                        inputRef={spouseRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl variant="outlined" fullWidth size="small" >
                                        <InputLabel id="blood-group">Blood Group</InputLabel>
                                        <Select
                                            labelId="blood-group"
                                            value={bg}
                                            onChange={handleBGChange}
                                            label="Blood Group"
                                            style={{ textAlign: "left" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'A+'}>A+</MenuItem>
                                            <MenuItem value={'B+'}>B+</MenuItem>
                                            <MenuItem value={'AB+'}>AB+</MenuItem>
                                            <MenuItem value={'O+'}>O+</MenuItem>
                                            <MenuItem value={'A-'}>A-</MenuItem>
                                            <MenuItem value={'B-'}>B-</MenuItem>
                                            <MenuItem value={'AB-'}>AB-</MenuItem>
                                            <MenuItem value={'O-'}>O-</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl variant="outlined" fullWidth size="small" >
                                        <InputLabel id="proof-of-identity">Proof of Identity</InputLabel>
                                        <Select
                                            labelId="proof-of-identity"
                                            value={poi}
                                            onChange={handlePoiChange}
                                            label="Proof of Identity"
                                            style={{ textAlign: "left" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Aadhaar(UID)'}>Aadhaar(UID)</MenuItem>
                                            <MenuItem value={'Passport'}>Passport</MenuItem>
                                            <MenuItem value={'Driving License'}>Driving License</MenuItem>
                                            <MenuItem value={'Voter ID Card'}>Voter ID Card</MenuItem>
                                            <MenuItem value={'PAN Card'}>PAN Card</MenuItem>
                                            <MenuItem value={'Passbook'}>Passbook</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Proof of Identity Number"
                                        inputRef={poiNumberRef}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                            Insurance Details
                        </Typography>
                        <div className="patient-details">
                            <Grid container spacing={3}>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Insurance Company Name"
                                        inputRef={insuranceCompanyRef}
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Insured Organization Name"
                                        inputRef={organizationRef}
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Policy Number"
                                        inputRef={policyNumberRef}
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Health Card Number"
                                        inputRef={healthCardNumberRef}
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Insurance Validity"
                                        type="date"
                                        inputRef={validityRef}
                                        defaultValue="2017-05-24"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                            Contact Details
                        </Typography>
                        <div className="patient-details">
                            <Grid container spacing={3}>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Email"
                                        size="small"
                                        inputRef={emailRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Mobile Number"
                                        size="small"
                                        inputRef={mobileRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Emergency Contact Number"
                                        size="small"
                                        inputRef={emergencyContactRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth

                                        label="Emergency Contact Person"
                                        size="small"
                                        inputRef={emergencyContactPersonRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        disabled
                                        fullWidth
                                        value="India"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl variant="outlined" fullWidth size="small">
                                        <InputLabel id="select-state">State / UT</InputLabel>
                                        <Select
                                            labelId="select-state"
                                            value={state}
                                            onChange={handleStateChange}
                                            label="State / UT"
                                            style={{ textAlign: "left" }}
                                        >
                                            <MenuItem value="">
                                                <em>Select</em>
                                            </MenuItem>
                                            {stateList.map((state) => <MenuItem value={state}>{state}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="City"
                                        size="small"
                                        inputRef={cityRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Flat No./House No./Door/Block No."
                                        size="small"
                                        inputRef={addressLine1Ref}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="Road / Street / Lane"
                                        size="small"
                                        inputRef={addressLine2Ref}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        label="PIN Code / ZIP Code"
                                        size="small"
                                        inputRef={pincodeRef}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Button onClick={async () => { await handleRegister(); await handleSuccessOpen(); }} variant="contained" color="primary" size="large" style={{ position: "relative", top: "6rem" }}>
                            Register
                        </Button>
                        <Dialog open={success} onClose={() => { handleSuccessClose(); window.location.reload(); }} aria-labelledby="Success">
                            <DialogContent>
                                You have successfully registered
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { handleSuccessClose(); window.location.reload(); }} color="secondary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={faceSuccess} onClose={handleFaceSuccessClose} aria-labelledby="Success">
                            <DialogContent>
                                Facial Recognition Done! You may now proceed with the rest of the application.
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleFaceSuccessClose} color="secondary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </div>
            </div>
        </div >
    )
}