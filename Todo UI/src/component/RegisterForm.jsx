import React, { useState } from 'react';
import { Formik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate= useNavigate();
    const [message,setMessage]= useState();
    const [showPassword,setShowPassword]= React.useState(false);
    // const [showConfirmPassword,setShowConfirmPassword]= React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleClickShowConfirmPassword = () =>setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
         event.preventDefault();
    };
    // const handleConfirmPWMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   };


    const registerUser= async(values)=>{
        const newUser= values;
        const res= await axios.post("http://localhost:8000/user/register",newUser);
        navigate("/login");
       setMessage(res.data.message)

    }

  
  return (
    <>
    {message&&<Typography variant='h4'>{message}</Typography>}
      <Formik
      initialValues={{  
        email: "",
        firstName: "",
        lastName: "",
        password: "",   
        gender: "",
        location: "",
        // confirmPassword: "", 
    }}
    validationSchema={Yup.object({
        email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .trim(),
      firstName: Yup.string()
        .max(55, "Must be 55 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("First name is required")
        .trim(),
      lastName: Yup.string()
        .max(55, "Must be 55 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Last name is required")
        .trim(),
      password: Yup.string().required("Password is required"), //TODO:"pattern"
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      gender: Yup.string()
        .required("Gender is  required")
        .oneOf(["male", "female", "preferNotToSay"]),
      location: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(55, "Must be 55 characters or less")
        .required("Location is required"),
      })}
      onSubmit={async(values)=>{
       await registerUser(values);
      }}
    >


      {formik => (
        <form onSubmit={formik.handleSubmit} 
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
            }}
        >
          <TextField label="Email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}

            <TextField
              label="First name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error-message">{formik.errors.firstName}</div>
            ) : null}

            <TextField
              label="Last name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error-message">{formik.errors.lastName}</div>
            ) : null}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                {...formik.getFieldProps("gender")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error-message">{formik.errors.gender}</div>
            ) : null}

            <TextField label="Location" {...formik.getFieldProps("location")} />
            {formik.touched.location && formik.errors.location ? (
              <div className="error-message">{formik.errors.location}</div>
            ) : null}


{/* =====================  password  ============================ */}

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            autoComplete='true'
            {...formik.getFieldProps("password")}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
           {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
            ) : null}
        </FormControl>

        {/* <FormControl variant="outlined" fullWidth>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            autoComplete='true'
            {...formik.getFieldProps("confirmPassword")}
            type={showConfirmPassword ? 'text' : 'confirmPassword'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleConfirmPWMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-message">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
        </FormControl> */}


          <Button type='submit' variant='contained' color="success">Sign Up</Button>
        </form>
      )}
    </Formik>
    </>
 
  );
};


export default RegisterForm;