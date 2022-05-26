import type { NextPage } from "next";
import { Button, Container, Divider, FormControl, Grid, Stack, TextField, ThemeProvider, Typography} from "@mui/material";
import { theme } from "../styles/theme";
import { useTheme } from "@mui/material/styles";
import React, { useState } from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";

const Sigmaker: NextPage = () => {
  const themeMUI = useTheme();
  const isNotMobile = useMediaQuery(themeMUI.breakpoints.up("sm"));

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    email: ""
  })

  const handleChange = e => {
    const name = e.target.name;
    const value =
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Signature Maker </Typography>
        <Divider />
        <br />
        <Typography variant="h5"> Enter your info here! </Typography>
        <FormControl sx={{ my: 3 }}>
          <Stack spacing={3}>
            <TextField 
              name = "fullName" 
              value= { formData.fullName } 
              onChange = { handleChange }
              label="Full name"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <TextField
              name = "title" 
              value= { formData.title } 
              onChange = { handleChange }
              label="Title"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <TextField
              name = "phone" 
              value= { formData.phone } 
              onChange = { handleChange }            
              label="Phone"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <Grid sx={{ display: isNotMobile ? "flex" : "block" }}>
              <TextField
              name = "email" 
              value= { formData.email } 
              onChange = { handleChange }              
                label="Email" 
                id="filled-size-small"
                variant="filled"
                size="small"
                sx={{ width: "25ch" }}
              />
              <Typography sx={{ mt: 2, ml: 1 }}>@hackbeanpot.com</Typography>
            </Grid>
          </Stack>
        </FormControl>
        <div>
          <Button size="large" color="info" variant="contained">
            Generate signature!
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Sigmaker;
