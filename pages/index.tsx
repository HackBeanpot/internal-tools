<<<<<<< HEAD
import React from 'react'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3">Tools</Typography>
        <Divider light />
        <Typography variant="body1">
          🛠 Internal tools + useful things for core members like…
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <Link href="/sigmaker" underline="hover">
                An email signature generator
              </Link>
            </Typography>
          </li>
        </ul>
      </StyledPageContainer>
    </ThemeProvider>
  )
}
=======
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
>>>>>>> d4e8b7b (preliminary draft for tools page, still need to make the page resizeable through @media)

export default Home
