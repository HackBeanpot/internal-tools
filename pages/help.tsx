import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import CSVTable from '../components/CSVTable'
import { ThemeProvider, Typography, Divider } from '@mui/material'
import { StyledPageContainer } from '../styles/common'
import { TextContainer } from '../pageStyles/home.styles'
import { theme } from '../styles/theme'

const Help: NextPage = () => {
  return (
        <Layout>
        <ThemeProvider theme={theme}>
          <StyledPageContainer>
            <Typography variant="h3">Help</Typography>
            <Typography variant="body1">
            <br />
              Use this emailsender to quickly send the same email to multiple recipients at once
              </Typography>
            <TextContainer>
              <Typography variant="h5">Steps: </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                      Enter the message inside the email. Leave the recipient name in the form of {'$ {name}'} with no spaces
                      in between. Leave the company name in the form of <br /> {'$ {company}'} with no spaces
                      in between. The words wrapped in {'$ {}'} will be filled automatically according to the CSV file uploaded.
                       An example message is shown below.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                      Import a CSV file that includes a table that fills four columns titled --
                       email, subject, name, company, where email is each recipient&apos;s email, subject is the subject of the email, name is the name of the recipient, company is the name of the company. An example CSV file is shown below.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                      Click on &quot;print final messages&quot; to verify the messages
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                      Either click &quot;send preview&quot; to send the previews to your inbox or click &quot;send&quot; to send the emails
                      to the specified recipients
                  </Typography>
                </li>
              </ul>
              <Divider light />
              <Typography variant="body1">
              <br />
                  Hi {'$ {name}'}!<br />
                  My name is Cindy Luo, and I’m on HackBeanpot’s sponsorship team this year.
I’m reaching out because we’ve started planning for HackBeanpot in February 2022,
and we would love for {'$ {company}'} to partner with us again!
This past event was a success, with 200 students from 33 schools,
creating 39 different projects, and it would not have been possible without you.
Thanks to {'$ {company}'} sponsorship, we were able to expose both new and returning hackers to<br />
 the {'$ {company}'} core values and mission statement! We plan to hold an in-person Hackathon
  but are open to remote sponsors, speakers, and mentors. We are closely monitoring public
   health guidance and will do our best to provide accommodations to make the sponsor
    experience as smooth as possible in light of COVID-19. I’ve attached our sponsorship
     packet to this email for you to look over, and would love to schedule a call to chat
     about it some more, and see what package might work best for {'$ {company}'}.
If you’re interested, please let me know when would be a good time. In the meantime, feel
 free to check out our website or Instagram to see what we’ve been up to! Thanks again for your continued support!
  We really appreciate it, and we are looking forward to hearing from you soon.<br />
Best, <br /> Cindy
</Typography>
<br />
            <CSVTable></CSVTable>
            </TextContainer>
          </StyledPageContainer>
        </ThemeProvider>
        </Layout>
  )
}
export default Help
