import React from 'react'
import Header from '../component/Header'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

const MainLayout = () => {
  return (
<>
<Header/>
    <Box sx={{minHeight:"90vh"}}>
        <Outlet/>
    </Box>
<Footer/>
</>
   
  )
}

export default MainLayout