import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@mui/material/colors';
import {Redirect} from 'react-router-dom';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
let LogoSize = { height: "5em", marginLeft: "39%" }


class SignUp extends Component {
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
    if (this.validateForm()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: fields["password"],
          firstName: fields["firstName"],
          lastName: fields["lastName"],
          mailId: fields["email"]
        })
      };
      fetch('/user/signUp', requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          
          return <Redirect to='/SignIn' />
        })
     
       
      // let fields = {};
      fields["FirstName"] = "";
      fields["emailid"] = "";
      fields["Lastname"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
      
    }

  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (fields["FirstName"]) {
      formIsValid = false;
      errors["FirstName"] = "*Enter your FirstName.";
    }

    if (typeof fields["FirstName"] !== "undefined") {
      if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["FirstName"] = "*Enter alphabet characters only.";
      }
    }

    if (fields["Lastname"]) {
      formIsValid = false;
      errors["Lastname"] = "*Enter your Lastname.";
    }

    if (typeof fields["Lastname"] !== "undefined") {
      if (!fields["Lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["Lastname"] = "*Enter alphabet characters only.";
      }
    }

    if (TextField["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Enter your email-ID.";
    }

    if (typeof TextField["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!pattern.test(TextField["emailid"])) {
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

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Card className="root" elevation={4} style={{ backgroundColor: "#f2f0f0" }}>
            <CardContent>
              {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
              <Grid className="avatar">
                <img src={image} className="LogoSize" style={LogoSize} alt="Logo" />
              </Grid>
              <Box textAlign="center">
                <Typography component="h1" variant="h5" style={{ marginBottom: "1em" }}>
                  Sign Up
                </Typography>
              </Box>
              <form className="form" noValidate onSubmit={this.submituserRegistrationForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField autoComplete="fname" size="small" value={this.state.fields.FirstName} onChange={this.handleChange} name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />
                    <div className="errorMsg">{this.state.errors.FirstName}</div>

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField variant="outlined" size="small" required fullWidth value={this.state.fields.Lastname} onChange={this.handleChange} label="Last Name" name="lastName" autoComplete="lname" />
                    <div className="errorMsg">{this.state.errors.Lastname}</div>

                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" size="small" value={this.state.fields.emailid} onChange={this.handleChange} required fullWidth label="Email Address" name="email" autoComplete="email" />
                    <div className="errorMsg">{this.state.errors.emailid}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" size="small" value={this.state.fields.password} onChange={this.handleChange} required fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
                    <div className="errorMsg">{this.state.errors.password}</div>

                  </Grid>
                </Grid>


                <Box textAlign='center'>
                  <ColorButton type="submit" variant="contained" onClick={SignUp} color="primary" className="submit" style={{ marginBottom: '0.8em' }}>Sign Up</ColorButton>
                </Box>

                <Grid container justifyContent="center">
                  <Grid item >
                    <Link exact="true" to="/" variant="body1" style={{ textDecoration: 'none' }} >
                      Already have an account? Sign in
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



    );
  }


}


export default SignUp;