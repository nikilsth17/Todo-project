import { Box, Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../component/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <Box sx={{
        width: "400px",
        minHeight: "350px",
        borderRadius: "10px",
        margin: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        marginTop: "5rem",
    }}
    >
    <Typography variant="h4" sx={{ color: "grey", marginBottom: "1rem" }}>
            Login 
    </Typography>    
    <LoginForm/>
    <Link to="/register">Not registered? Register</Link>
    </Box>


  )
}

export default LoginPage