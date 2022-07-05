import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import CSVTable from '../components/csvTable/CSVTable'
import { ThemeProvider, Typography, Divider } from '@mui/material'
import { StyledPageContainer, SectionContainer } from '../styles/common'
import { StyledSubHeader } from '../pageStyles/help.styles'
import { TextContainer } from '../pageStyles/home.styles'
import { theme } from '../styles/theme'

function createData (
  email: string,
  subject: string,
  name: string,
  company: string
) {
  return { email, subject, name, company }
}

const rows = [
  createData('example@facebook.com', 'Sponsoring HackBeanpot', 'Danaerys', 'Facebook'),
  createData('example@google.com', 'Sponsoring HackBeanpot', 'Jaime', 'Google'),
  createData('example@appfolio.com', 'Sponsoring HackBeanpot', 'Tyrion', 'Appfolio')
]
const Help: NextPage = () => {
  return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledPageContainer>
                    <Typography variant="h3">Help</Typography>
                    <Divider light />
                    <Typography variant="body1">
                        <br />
                        Use this email sender to quickly send the same email to multiple recipients at once
                    </Typography>
                    <TextContainer>
                        <SectionContainer>
                        <Typography variant="h5">Steps: </Typography>
                        <br />
                        <StyledSubHeader variant="h5">1) Enter message</StyledSubHeader>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Enter the message inside the email. The words that vary among each email should be wrapped in {'$ {}'}
                                    (with no spaces between the {'$'} and the brackets). In the example below, those words are {'$ {name}'} and {'$ {company}'},
                                    but in general, it is up to you how to name the variables in the brackets. Those
                                    words will be filled automatically according to the CSV file uploaded.
                                </Typography>
                            </li>
                        </ul>
                        <StyledSubHeader variant="h5">
                            2) Upload and import csv
                        </StyledSubHeader>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Import a CSV file that includes a table that fills at least 2 columns titled --
                                    email, subject -- where email is each recipient&apos;s email and subject is the subject of the email.
                                     You can add more columns with any title that you want. These titles should be what you hope to include
                                      in the brackets in the above step(in our example it was name and company).
                                    Scroll down to see the full CSV file example.
                                </Typography>
                            </li>
                        </ul>
                        <StyledSubHeader variant="h5">
                            3) Verify final messages
                        </StyledSubHeader>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Click on &quot;print final messages&quot; to verify if the printed message is what you want to send in the emails(all grammar and spelling is correct, etc)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Click &quot;send&quot; to send the emails
                                    to the specified recipients
                                </Typography>
                            </li>
                        </ul>
                        </SectionContainer>
                        <Divider light />
                        <SectionContainer>
                        <Typography variant="h6">Example Message: </Typography>
                        <Typography variant="body1">
                            <br />
                            Hi {'$ {name}'}!<br /><br />
                            My name is Cindy Luo, and I’m on HackBeanpot’s sponsorship team this year.
                            I’m reaching out because we’ve started planning for HackBeanpot in February 2022,
                            and we would love for {'$ {company}'} to partner with us again!
                            This past event was a success, with 200 students from 33 schools,
                            creating 39 different projects, and it would not have been possible without you.
                            Thanks to {'$ {company}'} sponsorship, we were able to expose both new and returning hackers to
                            the {'$ {company}'} core values and mission statement!<br /><br /> We plan to hold an in-person Hackathon
                            but are open to remote sponsors, speakers, and mentors. We are closely monitoring public
                            health guidance and will do our best to provide accommodations to make the sponsor
                            experience as smooth as possible in light of COVID-19. I’ve attached our sponsorship
                            packet to this email for you to look over, and would love to schedule a call to chat
                            about it some more, and see what package might work best for {'$ {company}'}.
                            If you’re interested, please let me know when would be a good time. In the meantime, feel
                            free to check out our website or Instagram to see what we’ve been up to! Thanks again for your continued support!
                            We really appreciate it, and we are looking forward to hearing from you soon.<br /><br />
                            Best, <br /> Cindy
                        </Typography>
                        </SectionContainer>
                        <Divider light />
                        <Typography variant="h6">Example CSV: </Typography>
                        <br />
                    </TextContainer>
                    <CSVTable headers={['email', 'subject', 'name', 'company']} rows={rows} />
                </StyledPageContainer>
            </ThemeProvider>
        </Layout>
  )
}
export default Help