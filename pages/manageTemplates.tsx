import React from 'react'
import type { NextPage } from 'next'
import { Typography, ThemeProvider, Divider, Stack, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Layout from '../components/layout/Layout'
import { StyledPageContainer, SectionContainer } from '../styles/common'
import TemplateDropdown from '../components/templateDropdown/templateDropdown'

const ManageTemplates: NextPage = () => {
  const theme = useTheme()
  return (
        <>
            <Layout>
                <ThemeProvider theme={theme}>
                    <StyledPageContainer>
                        <Stack direction="row" spacing={'50%'}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                            <Typography variant="h4">Manage Templates</Typography>
                            <Link href="/emailSenderHelp" underline="hover">
                                {'←'} Email Sender
                            </Link>
                        </Stack>
                        <Divider />
                        <br />
                        <SectionContainer>
                            <TemplateDropdown></TemplateDropdown>
                        </SectionContainer>

                    </StyledPageContainer>
                </ThemeProvider>
            </Layout>
        </>
  )
}

export default ManageTemplates
