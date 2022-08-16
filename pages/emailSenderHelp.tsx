import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import CSVTable from '../components/csvTable/CSVTable'
import { ThemeProvider, Typography, Divider } from '@mui/material'
import { StyledPageContainer, SectionContainer } from '../styles/common'
import { StyledSubHeader, StyledLink } from '../pageStyles/help.styles'
import { TextContainer } from '../pageStyles/home.styles'
import { theme } from '../styles/theme'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'

function createData (
  email: string,
  subject: string,
  name: string,
  company: string
) {
  return { email, subject, name, company }
}

const rows = [
  createData(
    'example@facebook.com',
    'Sponsoring HackBeanpot',
    'Danaerys',
    'Facebook'
  ),
  createData('example@google.com', 'Sponsoring HackBeanpot', 'Jaime', 'Google'),
  createData(
    'example@appfolio.com',
    'Sponsoring HackBeanpot',
    'Tyrion',
    'Appfolio'
  )
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
            Use this email sender to quickly send the same email to multiple
            recipients at once!
          </Typography>
          <TextContainer>
            <SectionContainer>
              <Typography variant="h5">Steps: </Typography>
              <br />
              <StyledSubHeader variant="h6">
                1) Email subject
              </StyledSubHeader>
              <ul>
                <li>
                  <Typography variant="body1">
                    Choose between inputting a standard email subject (same subject sent
                    to all recipients) or specifying the subject per recipient.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    If you choose to send a standard subject then you will be prompted
                    to input it here. It will not need to also be uploaded through the CSV.
                    In other words, if you select the standard subject and
                    have a subject column in your csv, the standard subject will be applied.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    If you choose to customize the subject per recipient then you need to add
                    a &quot;subject&quot; column to your CSV of emails. This must be filled for
                    every recipient row.
                  </Typography>
                </li>
              </ul>
              <StyledSubHeader variant="h6">
                2) Enter email content
              </StyledSubHeader>
              <ul>
                <li>
                  <Typography variant="body1">
                    Enter the message inside the email. The words that vary
                    among each email should be wrapped in {'$ {}'}
                    (with no spaces between the {'$'} and the brackets). In the
                    example below, those words are {'$ {name}'} and {'$ {company}'},
                    but in general, it is up to you how to name
                    the variables in the brackets. Those words will be filled
                    automatically according to the CSV file uploaded.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    You may also choose to use your HackBeanpot email signature. Clicking the
                    checkbox allows you to fill in your name, title, phone number, and email.
                    Only enter the first part of your email, as the
                    {'"'}@hackbeanpot.com{'"'} will be filled in automatically.
                  </Typography>
                </li>
              </ul>
              <StyledSubHeader variant="h6">
                3) Upload and import csv
              </StyledSubHeader>
              <ul>
                <li>
                  <Typography variant="body1">
                    Import a CSV file that includes a table that fills at least
                     2 columns titled -- email, subject -- where email is each
                    recipient&apos;s email and subject is the subject of the
                    email. You can add more columns with any title that you
                    want. These titles should be what you hope to include in the
                    brackets in the above step(in our example it was name and
                    company). Scroll down to see the full CSV file example.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    You can export a Google Sheet as a CSV file by going to File --{'>'}{' '}
                    Download --{'>'} Comma Separated Values (.csv)
                  </Typography>
                </li>
              </ul>
              <StyledSubHeader variant="h6">
                4) Verify final messages
              </StyledSubHeader>
              <ul>
                <li>
                  <Typography variant="body1">
                    Click on &quot;print final messages&quot; to verify if the
                    printed messages are what you intent to send in the emails. Check
                    that all grammar, punctuation, and per-recipient customization have
                    been completed as intended.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    If you see any issues, you can either reupload a fixed CSV or you can
                    make edits directly on the email sender by clicking the &quot;edit&quot;
                    button next to email drafts. Remember to change ALL emails requiring
                    revisions if you make them in one place, because they will not auto-update
                    through our interface.
                  </Typography>
                </li>
              </ul>
              <StyledSubHeader variant="h6">
                5) Send messages
              </StyledSubHeader>
              <ul>
                <li>
                  <Typography variant="body1">
                    Verify that you are logged in to the site with the email from which you wish
                    to send the emails out. The emails will automatically be sent through this
                    email.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    If you would like to schedule your email to be sent at a later date and time
                    then you may specify this up to 3 days ahead of the current time.
                    Scheduled emails can be deleted in the Mailgun dashboard - see instructions{' '}
                    <StyledLink href="https://help.mailgun.com/hc/en-us/articles/360012487654
                    -How-Can-I-Delete-Messages-From-the-Queue-">here</StyledLink>. Ignore this
                    step if you would like to send out the emails immediately.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                   When scheduling across timezones, emails will be sent at EST time
                   and will not adjust to timezone differences.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Click &quot;send&quot; to send the emails to the specified
                    recipients. NOTE: The emails will be sent from the account of the logged in user
                    logged in to this site, so prior to sending you should ensure that you are
                    logged in with the correct account.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                   You have an allowance of 5,000 emails per month and
                   a limit of 300 emails per day.
                  </Typography>
                </li>
              </ul>
            </SectionContainer>
            <Divider light />
            <SectionContainer>
              <Typography variant="h5">Example Data: </Typography>
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Example Message: </Typography>
              <Typography variant="body1">
                <br />
                Hi {'$ {name}'}!<br />
                <br />
                My name is Cindy Luo, and I’m on HackBeanpot’s sponsorship team
                this year. I’m reaching out because we’ve started planning for
                HackBeanpot in February 2022, and we would love for{' '}
                {'$ {company}'} to partner with us again! This past event was a
                success, with 200 students from 33 schools, creating 39
                different projects, and it would not have been possible without
                you. Thanks to {'$ {company}'} sponsorship, we were able to
                expose both new and returning hackers to the {'$ {company}'}{' '}
                core values and mission statement!
                <br />
                <br /> We plan to hold an in-person Hackathon but are open to
                remote sponsors, speakers, and mentors. We are closely
                monitoring public health guidance and will do our best to
                provide accommodations to make the sponsor experience as smooth
                as possible in light of COVID-19. I’ve attached our sponsorship
                packet to this email for you to look over, and would love to
                schedule a call to chat about it some more, and see what package
                might work best for {'$ {company}'}. If you’re interested,
                please let me know when would be a good time. In the meantime,
                feel free to check out our website or Instagram to see what
                we’ve been up to! Thanks again for your continued support! We
                really appreciate it, and we are looking forward to hearing from
                you soon.
                <br />
                <br />
                Best, <br /> Cindy
              </Typography>
            </SectionContainer>
            <Divider light />
            <SectionContainer>
              <Typography variant="h6">Example CSV: </Typography>
              <br />
              <CSVTable
                headers={['email', 'subject', 'name', 'company']}
                rows={rows}
              />
            </SectionContainer>
          </TextContainer>
        </StyledPageContainer>
      </ThemeProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect
export default Help
