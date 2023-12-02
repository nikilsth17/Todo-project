import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box className="footer" sx={{marginTop:"2rem"}}>
    <Typography variant="h6" sx={{ color: "white",gap:"2rem" }}>
      Copyrignt &copy; 2023 Todo App
    </Typography>
  </Box>
  )
}

export default Footer