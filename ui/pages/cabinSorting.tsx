import Layout from "../components/layout/Layout";
import {
    Divider,
    Grid,
    ThemeProvider,
    Typography
} from '@mui/material'
import { theme } from "../styles/theme";
import { StyledButton, StyledPageContainer } from "../styles/common";
import { StyledGrid } from "../pageStyles/sigmaker.styles";
import CSVTable from "../components/csvTable/CSVTable";
import CSVCabinTable from "../components/csvTable/CSVCabinTable";

export default function CabinSorting() {
    return <Layout>
      <ThemeProvider theme={theme}>
        <StyledPageContainer>
          <Typography variant="h3"> Cabin Sorting Tool </Typography>
          <Divider />
          <br />
          <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim description of the tool.</Typography>
          <br />
          <StyledButton
            size="large"
            color="info"
            variant="contained"
            type="submit"
            sx={{width: '16em'}}
          >
            Regenerate Sorted Hackers
          </StyledButton>
          <br />
          <CSVCabinTable
            headers={['Cabin 1', 'Cabin 2', 'Cabin 3', 'Cabin 4', 'Cabin 5', 'Cabin 6']}
            rows={[]}/>

        </StyledPageContainer>
      </ThemeProvider>
    </Layout>
}