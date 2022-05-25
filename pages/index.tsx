import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return <ThemeProvider theme={theme}>
    <div className = "tool-box">
    <h3>Tools</h3>
    <Divider light />
    <Typography variant="body1" component="p">
    🛠 Internal tools + useful things for core members like…
    </Typography>
    <Typography variant="body1" component="ul">

    <li>
    <a href="https://tools.hackbeanpot.com/sigmaker/">An email signature generator</a> 
     (last updated September 2019)
      </li>


    
    </Typography>
    </div>
    
    
   


   
  </ThemeProvider>;
};

export default Home;
