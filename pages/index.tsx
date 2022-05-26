import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="tool-box">
        <h3>Tools</h3>
        <Divider light />
        <Typography variant="body1" component="p">
          🛠 Internal tools + useful things for core members like…
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            <Link
              href="https://tools.hackbeanpot.com/sigmaker/"
              target="_blank"
              underline="hover"
            >
              An email signature generator{" "}
            </Link>
            (last updated September 2019)
          </li>
        </Typography>
      </div>
    </ThemeProvider>
  );
};

export default Home;
