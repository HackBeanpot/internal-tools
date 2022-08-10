import React from 'react'
import type { NextPage } from 'next'
import { Typography, ThemeProvider, Divider, Stack, Link, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Layout from '../components/layout/Layout'
import { StyledPageContainer, SectionContainer, StyledTextArea } from '../styles/common'
import TemplateDropdown from '../components/templateDropdown/templateDropdown'
import { MessageTemplate } from '../lib/types'
import { StyledTextField } from '../pageStyles/emailSender.styles'

const ManageTemplates: NextPage = () => {
  const theme = useTheme()
  const template1: MessageTemplate = {
    messageID: 1,
    title: 'title 1',
    message: 'message 1',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'mike'
  }
  const template2: MessageTemplate = {
    messageID: 2,
    title: 'title 2',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'karyna'
  }

  const template3: MessageTemplate = {
    messageID: 3,
    title: 'title 3',
    message: 'message 3',
    timestamp: new Date('October 9, 2003 03:24:00'),
    createdBy: 'dean'
  }

  const messageArray: MessageTemplate[] = [template1, template2, template3]
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
                            <TemplateDropdown templates={messageArray} />
                        </SectionContainer>
                        <SectionContainer>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body1">Template Name</Typography>
                                <Typography color="red">*</Typography>
                            </Stack>
                            <StyledTextField
                                id="outlined-basic"
                                variant="outlined"
                            // onChange={handleEmailSubject}
                            />
                        </SectionContainer>
                        <SectionContainer>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body1">Template Message</Typography>
                                <Typography color="red">*</Typography>
                            </Stack>
                            <StyledTextArea
                                aria-label="message-text-area"
                                placeholder="Paste in message"
                                // onChange={(e) => setMessage(e.target.value)}
                                minRows={5}
                            />
                        </SectionContainer>
                        <Button variant="contained" component="span">
                            Create New Message
                        </Button>
                    </StyledPageContainer>
                </ThemeProvider>
            </Layout>
        </>
  )
}

export default ManageTemplates
