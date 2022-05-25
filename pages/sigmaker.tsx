import type { NextPage } from "next";
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Divider } from "@mui/material";
import { FormControl } from '@mui/material';
import { Stack } from '@mui/material';
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Typography } from "@mui/material";
import { theme } from "../styles/theme";

const Sigmaker: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container> 

      <Typography variant="h3"> Signature Maker </Typography>
      <Divider />
      <Typography variant="body1"> Enter your info here! </Typography>
      <FormControl sx={{ width: '25ch' }}> <Stack spacing={2}>
      
      <TextField
          label="Full name"
          id="filled-size-small"
          variant="filled"
          size="small"
        />

    
      <TextField
          label="Title"
          id="filled-size-small"
          variant="filled"
          size="small"
        /> 
      <TextField
          label="Phone"
          id="filled-size-small"
          variant="filled"
          size="small"
        /> 
      
        <Stack direction="row" spacing={1}>
        <TextField
          label="Email"
          id="filled-size-small"
          variant="filled"
          size="small"
        /> @hackbeanpot.com
</Stack>
    </Stack> </FormControl>  
      <div> <Button size='medium' variant='contained'> Generate email signature! </Button> </div>
      </Container> 
    </ThemeProvider>
  );
};

export default Sigmaker;
