import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { $axios } from '../lib/axios';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from '../store/slice/snackbarSlice';


const LoginForm = () => {
  const dispatch= useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {message,setMessage}= useState();
  const navigate= useNavigate();
 const loginMutation= useMutation({
  mutationKey:["login"],
  mutationFn:async(values)=>{
    return await $axios.post("/user/login",values);
  },
  onSuccess: (res) => {
    localStorage.setItem("accesstoken", res?.data?.token);
    localStorage.setItem("firstName", res?.data?.user?.firstName);
    localStorage.setItem("lastName",res?.data?.user?.lastName);
    
    navigate("/home");
  },

  onError:(error)=>{
    dispatch(openErrorSnackbar(error?.res?.data?.message));
  }
  
 })

    

  return (
    <>
    {message&&<Typography variant='h4'>{message}</Typography>}
    <Formik
      initialValues={{  
        email: "",
        password:"",
        
    }}
    validationSchema={Yup.object({
        email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .trim(),
      password: Yup.string().required("Password is required"), //TODO:"pattern"
      })}
      onSubmit={async(values)=>{
      //  await loginUser(values);
       loginMutation.mutate(values)
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


          <Button type='submit' variant='contained' color="success">Login In</Button>
        </form>
      )}

    </Formik>
    </>
  );
};

export default LoginForm;