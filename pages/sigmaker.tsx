import type { NextPage } from "next";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Divider } from "@mui/material";
import { FormControl } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { theme } from "../styles/theme";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sigmaker: NextPage = () => {
  const themeMUI = useTheme();
  const matches = useMediaQuery(themeMUI.breakpoints.up("sm"));
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
              label="Full name"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <TextField
              label="Title"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <TextField
              label="Phone"
              id="filled-size-small"
              variant="filled"
              size="small"
              sx={{ width: "25ch" }}
            />
            <Grid sx={{ display: matches ? "flex" : "block" }}>
              <TextField
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
