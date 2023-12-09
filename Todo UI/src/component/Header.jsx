import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

import LogoutDialog from './LogoutDialog';
import { getUserShortName } from '../utilis/userShortName';
import { CssBaseline, Drawer, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';



const Header=()=> {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (


<Box sx={{ display: 'flex'  }}>
<CssBaseline />
<AppBar component="nav"
sx={{
  minHeight:"4rem",
  display:"flex",
  backgroundColor:"AppWorkspace"
  

}}>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 3, 
          display: { xs: 'none', sm: 'block' },
          alignItems:"center",
          justifyContent:"center",
          fontFamily: 'monospace',
          fontWeight: 600,
          color: "black",
          textDecoration: 'none', }}
    >
      TODO App
    </Typography>
    

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              color: "Black",
              textDecoration: 'none',
            }}
          >
            TODO App
          </Typography>
          
    <Stack direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}

    >
      <Avatar
        sx={{ bgcolor: deepOrange[400] }}
      >
        {getUserShortName()}
        
      </Avatar>
    </Stack>

    <LogoutDialog/>
  </Toolbar>
</AppBar>


</Box>
  
  );
}
 export default Header;