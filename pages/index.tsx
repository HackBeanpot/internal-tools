import { ThemeProvider, Divider, Typography, Link } from "@mui/material";
import type { NextPage } from "next";
import { PageContainer } from "../styles/common";
import { theme } from "../styles/theme";

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
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
      </PageContainer>
    </ThemeProvider>
  );
};

export default Home;
