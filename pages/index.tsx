import { ThemeProvider, Divider, Typography, Link } from "@mui/material";
import type { NextPage } from "next";
import { theme } from "../styles/theme";


const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
