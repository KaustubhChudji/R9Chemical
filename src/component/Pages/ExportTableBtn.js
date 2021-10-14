import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';

 
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[400],
    },
  }));

let ExportBtn = {marginBottom: "1em"}

export default function CustomizedButtons() {
    
  return (
    <Stack spacing={2} direction="row" style={{justifyContent:"flex-end"}}>
      <ColorButton variant="contained" style={ExportBtn}>Export Data</ColorButton> 
    </Stack>
  );
}
