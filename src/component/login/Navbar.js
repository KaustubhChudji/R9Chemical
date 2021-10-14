import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography'

const useStyles = makeStyles((theme) => ({
   
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '43%',
  }, 
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  //const logo = require('./img/logo192.png');
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* <Grid className={classes.avatar}>
               <img src={logo} alt="Logo" className="avatar" />
          </Grid> */}
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography> 
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
