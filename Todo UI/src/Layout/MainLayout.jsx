import React from 'react'
import Header from '../component/Header'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

const MainLayout = () => {
const backgroundImage= '/img/photo.jpg';
return (
<>
<Header/>
    <Box className="backgroundImageContainer"   > 
        <Outlet/>
    </Box>
<Footer/>
</>
   
  )
}

export default MainLayout