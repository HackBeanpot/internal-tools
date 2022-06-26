import type { NextPage } from "next";
import { theme } from "../styles/theme";

import React from 'react'
import Layout from '../components/layout/Layout'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Layout>
    <ThemeProvider theme={theme}>
      <div className="tool-box">
      <Typography variant="h3" component="h3">
        Tools
        </Typography>
        <Divider light />
        <Typography variant="body1" component="p">
          🛠 Internal tools + useful things for core members like…
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            <Link
              href="/sigmaker"
              underline="hover"
            >
              An email signature generator
            </Link>
          </li>
        </Typography>
      </div>
    </ThemeProvider>
    </Layout>
  );
};

export default Home;
