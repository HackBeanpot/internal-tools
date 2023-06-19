import Layout from "../components/layout/Layout";
import { Button } from "@mui/material";
import {
    Divider,
    ThemeProvider,
    Typography
} from '@mui/material'
import { theme } from "../styles/theme";
import { StyledButton, StyledPageContainer } from "../styles/common";
import CSVCabinTable from "../components/csvTable/CSVCabinTable";
//hi
export default function CabinSorting() {
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <StyledPageContainer>
            <Typography variant="h3"> Cabin Sorting Tool </Typography>
            <Divider />
            <br />
            <Typography variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim description of the tool.
            </Typography>
            <br />
            <div style={{ justifyContent: "space-between" }}>
              <StyledButton
                size="large"
                color="info"
                variant="contained"
                type="submit"
                sx={{ width: "16em" }}
              >
                Regenerate Sorted Hackers
              </StyledButton>
              <span style={{ float: "right" }}>
                <Button
                  variant="contained"
                  component="span"
                  size="large"
                  style={{ textTransform: "none", width: "10em" }}
                >
                  Export CSV
                </Button>
              </span>
            </div>
            <br />
            <CSVCabinTable
              headers={[
                "Cabin 1",
                "Cabin 2",
                "Cabin 3",
                "Cabin 4",
                "Cabin 5",
                "Cabin 6",
              ]}
            />
          </StyledPageContainer>
        </ThemeProvider>
      </Layout>
    );
}