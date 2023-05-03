import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getSingleUser } from '../redux/actions';

const EditUser = () => {

    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });
    const [error, setError] = useState("");

    const { name, email, contact, address } = state;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();
    let { user } = useSelector((state, id) => state.data);

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []);

    useEffect(() => {
        if (user) {
            setState({ ...user });
        }
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !address || !email || !contact) {
            setError("Please fill all input fields");
        }
        else {
            dispatch(updateUser(state, id));
            navigate("/");
            setError("");
        }
    }

    return (
        <Box
            component="form"
            sx={{
                marginTop: "100px",
                '& > :not(style)': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >

            <Button style={{ width: "100px", marginTop: "20px" }} variant="contained" color="error" onClick={() => navigate("/")}>Go Back</Button>

            <h2 style={{ marginLeft: "370px" }}> Edit User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <TextField id="standard-basic" name="name" label="Name" variant="standard" value={name || ""} type="text" onChange={handleInputChange} />
            <br />
            <TextField id="standard-basic" name="email" label="Email" variant="standard" value={email || ""} type="email" onChange={handleInputChange} />
            <br />
            <TextField id="standard-basic" name="contact" label="Contact" variant="standard" value={contact || ""} type="number" onChange={handleInputChange} />
            <br />
            <TextField id="standard-basic" name="address" label="Address" variant="standard" value={address || ""} type="text" onChange={handleInputChange} />
            <br />
            <Button style={{ width: "100px" }} variant="contained" color="primary" type="submit" onChange={handleInputChange}>Update</Button>
        </Box>
    )
}

export default EditUser