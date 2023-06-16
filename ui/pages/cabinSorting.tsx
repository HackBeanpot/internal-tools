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
import { FullscreenExit } from "@mui/icons-material";

export default function CabinSorting() {


    const styledButtonContainer= {display: 'flex-end'}

    return <Layout>
        <ThemeProvider theme={theme}>
            <StyledPageContainer>
                <Typography variant="h3"> Cabin Sorting Tool </Typography>
                <Divider />
                <br />
                <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim description of the tool.</Typography>
                <br />
                <div style={{justifyContent: 'space-between'}}>
                    <StyledButton
                        size="large"
                        color="info"
                        variant="contained"
                        type="submit"
                        sx={{ width: '16em' }}
                    >
                        Regenerate Sorted Hackers
                    </StyledButton>
                    <span style={{float: 'right'}}>
                        <StyledButton
                        size="large"
                        bgColor={theme.palette.Blue.main}
                        variant="contained"
                        type="submit"
                        sx={{ width: '10em' }}
                    >
                        Export CSV
                    </StyledButton>
                    </span>
                </div>
                <br />
                <CSVCabinTable
                    headers={['Cabin 1', 'Cabin 2', 'Cabin 3', 'Cabin 4', 'Cabin 5', 'Cabin 6']}
                    cols={[]} />

            </StyledPageContainer>
        </ThemeProvider>
    </Layout>
}