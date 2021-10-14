import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles,styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@mui/material/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
 
  avatar: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
    marginLeft: '39%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[600],
  '&:hover': {
    backgroundColor: red[400],
  },
}));

let image = "logo192.png"
let LogoSize = {height:"5em",marginLeft:"39%"}
//document.body.style.backgroundColor = "#7a7a7c";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submituserRegistrationForm(e) {
    debugger;
    e.preventDefault();
    let fields = this.state.fields;
    let mailId = fields['email'];
    let password = fields['password'];
    if (this.validateForm()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: fields["email"]
      };
      
      fetch('/user/findByMailId', requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          if (response.mailId !== fields["email"] && response.password !== fields["password"]){

          }
          console.log(response);
          //need to open Dashboard page
        })
        .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
        });
        fields["FirstName"] = "";
        fields["emailid"] = "";
        fields["Lastname"] = "";
        fields["password"] = "";
        this.setState({fields:fields});
        alert("Form submitted");
    }

  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

   
    if (fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Enter valid email-ID.";
      }
    }

    

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }

render() {
  return (
    <div>
  <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className="paper" >
      <Card className="root" style={{backgroundColor:"#f2f0f0"}}>
          <CardContent> 
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Grid className="avatar">
               <img src={image} className="LogoSize" style={LogoSize} alt="Logo"  />
        </Grid>
        <Box textAlign="center">
        <Typography component="h1" variant="h5" style={{marginBottom:"1em"}}>
          Sign In
        </Typography>
        </Box>
        <form className="form" noValidate onSubmit= {this.submituserRegistrationForm}>
            <TextField variant="outlined" value={this.state.fields.emailid} onChange={this.handleChange}  margin="normal" size="small" required  fullWidth id="email" label="Email Address"  name="email"  autoComplete="email" autoFocus />
            <div className="errorMsg">{this.state.errors.emailid}</div>

            <TextField variant="outlined" value={this.state.fields.password} onChange={this.handleChange} margin="normal" size="small" required fullWidth name="password" label="Password" type="password"  id="password" autoComplete="current-password" />
            <div className="errorMsg">{this.state.errors.password}</div>

            <FormControlLabel  control={<Checkbox value="remember" color="primary" />} label="Remember me"  />
             
            <Box textAlign='center'>
            <ColorButton type="submit" onClick={SignIn} variant="contained" size="medium" color="primary" className="submit"  variant="contained">Sign In</ColorButton>
            </Box>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item> 
                <Link exact="true" to="/SignUP" variant="body2" style={{ textDecoration: 'none' }}>
                  {"New Sign Up"}
                </Link>
              </Grid>
            </Grid> 

        </form>
        </CardContent>
        </Card>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
 </div>
    );
}


}


export default SignIn;