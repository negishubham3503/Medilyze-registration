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
import { fetchRegistrarName } from "../../contexts/FirestoreContext";
import { getFace } from "../../contexts/FaceDetectionContext";
import { compareFromDatabase } from "../../contexts/FirebaseDatabaseContext";
import * as faceApi from "face-api.js";
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';



export default function PatientRegistration() {
    const { login, logout, getUID } = useAuth()
    const webcamRef = useRef(null);
    const aadharRef = useRef();
    const otpRef = useRef();
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const lastNameRef = useRef();
    const dateRef = useRef();
    const fatherRef = useRef();
    const motherRef = useRef();
    const spouseRef = useRef();
    const insuranceCompanyRef = useRef();
    const emailRef = useRef();
    const mobileRef = useRef();
    const emergencyContactRef = useRef();
    const emergencyContactPersonRef = useRef();
    const cityRef = useRef();
    const addressLine1Ref = useRef();
    const addressLine2Ref = useRef();
    const pincodeRef = useRef();
    const [pid, setPid] = useState();
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false);
    const [doctorName, setDoctorName] = useState("")
    const [gender, setGender] = useState('female');
    const [maritalStatus, setMaritalStatus] = useState('unmarried');
    const [bg, setBG] = useState('');
    const [options, setOptions] = useState('')
    const [state, setState] = useState("");
    const history = useHistory()
    var reg;
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
            const name = await fetchRegistrarName(UID);
            setDoctorName(name)
        }
        fetchData();

    }, [doctorName])

    useEffect(() => {
        async function fetchData() {
            await faceApi.nets.tinyFaceDetector.load("/models/");
        }
        fetchData();
    }, [])

    const handleRegister = async () => {
        
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

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const handleBGChange = (event) => {
        setBG(event.target.value);
    };

    const handlePIDChange = (event) => {
        setPid(event.target.value);
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
                <AccountCircleIcon />
                <Typography style={{ marginRight: "2.5rem", marginLeft: "0.5rem" }}>
                    {doctorName}
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
                    {error && <Alert severity="error" style={{ marginBottom: "1rem", width: "29.5rem" }}>{error}</Alert>}
                    <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                        Personal Identity
                    </Typography>
                    <Grid container spacing={6}>
                        <Grid container item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="aadhar-no"
                                label="Aadhar Number"
                                name="aadhar"
                                autoComplete="number"
                                size="small"
                                inputRef={aadharRef}
                            />
                        </Grid>
                        <Grid container item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="otp"
                                label="OTP"
                                name="otp"
                                size="small"
                                inputRef={otpRef}
                            />
                        </Grid>
                        <Grid container item xs={6}>
                            <Button variant="contained" color="primary">
                                Verify
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="form-container-registration">
                    <form>
                        <div className="patient-details">
                            <Grid container spacing={3}>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="patient-first-name"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="name"
                                        size="small"
                                        inputRef={firstNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="patient-middle-name"
                                        label="Middle Name"
                                        name="middleName"
                                        autoComplete="name"
                                        size="small"
                                        inputRef={middleNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="patient-last-name"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="name"
                                        size="small"
                                        inputRef={lastNameRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        id="date"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="DOB"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        size="small"
                                        inputRef={dateRef}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="father-name"
                                        label="Father's Name"
                                        name="fatherName"
                                        autoComplete="name"
                                        size="small"
                                        inputRef={fatherRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="mother-name"
                                        label="Mother's Name"
                                        name="motherName"
                                        autoComplete="name"
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
                                        id="spouse-name"
                                        label="Spouse Name"
                                        name="spouseName"
                                        size="small"
                                        inputRef={spouseRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl variant="outlined" fullWidth size="small" required>
                                        <InputLabel id="blood-group">Blood Group</InputLabel>
                                        <Select
                                            labelId="blood-group"
                                            id="bg"
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
                                    <FormControl variant="outlined" fullWidth size="small" required>
                                        <InputLabel id="proof-of-identity">Proof of Identity</InputLabel>
                                        <Select
                                            labelId="proof-of-identity"
                                            id="poi"
                                            value={pid}

                                            onChange={handlePIDChange}
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
                                        required
                                        id="height"
                                        label="Height"
                                        name="height"
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
                                        id="insurance-company"
                                        label="Insurance Company"
                                        name="insuranceCompany"
                                        size="small"
                                        inputRef={insuranceCompanyRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="height"
                                        label="Insurance Company"
                                        name="height"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="height"
                                        label="Insurance Company"
                                        name="height"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        id="height"
                                        label="Insurance Company"
                                        name="height"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        id="height"
                                        label="Insurance Company"
                                        name="height"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        id="height"
                                        label="Insurance Company"
                                        name="height"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        {/* <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                            Insurance Information
                        </Typography>
                        <div className="patient-details">
                            <Input
                                type="file"
                                label="Upload Medical File"
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </div> */}
                        <Typography variant="h4" style={{ margin: "1rem", color: "#1990EA" }}>
                            Contact Details
                        </Typography>
                        <div className="patient-details">
                            <Grid container spacing={3}>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="patient-email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        size="small"
                                        inputRef={emailRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="patient-mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        autoComplete="number"
                                        size="small"
                                        inputRef={mobileRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        id="emergency-contact"
                                        label="Emergency Contact Number"
                                        name="emergencyContact"
                                        autoComplete="number"
                                        size="small"
                                        inputRef={emergencyContactRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        id="emergency-person"
                                        label="Emergency Contact Person"
                                        name="emergencyPerson"
                                        size="small"
                                        inputRef={emergencyContactPersonRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        disabled
                                        fullWidth
                                        id="country"
                                        value="India"
                                        name="country"
                                        autoComplete="country"
                                        size="small"
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <FormControl variant="outlined" fullWidth required size="small">
                                        <InputLabel id="select-state">State / UT</InputLabel>
                                        <Select
                                            labelId="select-state"
                                            id="state"
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
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        name="city"
                                        autoComplete="city"
                                        size="small"
                                        inputRef={cityRef}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address-line-1"
                                        label="Flat No./House No./Door/Block No."
                                        name="addressLine1"
                                        size="small"
                                        inputRef={addressLine1Ref}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="road-street"
                                        label="Road / Street / Lane"
                                        name="city"
                                        size="small"
                                        inputRef={addressLine2Ref}
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="pincode"
                                        label="PIN Code / ZIP Code"
                                        name="pincode"
                                        autoComplete="zipcode"
                                        size="small"
                                        inputRef={pincodeRef}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        {/* <Typography variant="h5" style={{ margin: "1rem", color: "#1990EA", display: "inline-flex", position: "relative", right: "21.5rem" }}>
                            Authentication Status
                        </Typography>
                        <FormControlLabel
                            style={{ position: "relative", right: "21.5rem", marginBottom: "0.3rem" }}
                            control={<Checkbox checked={authenticated} name="authenticationStatus" size="medium" style={{ color: "green", display: "block" }} />}
                        /> */}
                        <Button variant="contained" color="primary" size="large" onClick={handleRegister} style={{ position: "relative", right: "5rem", top: "6rem" }}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}