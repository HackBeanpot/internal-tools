import React, { useEffect } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { StyledLogoImage } from '../../pageStyles/sigmaker.styles'
import { StyledButton } from '../../styles/common'
import { StyledSignInPageContainer } from '../../pageStyles/signin.styles'
import { icons } from '../../styles/icons'
import { ThemeProvider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { theme } from '../../styles/theme'
import { InferGetServerSidePropsType } from 'next'

export default function SignIn ({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const session = useSession()
  useEffect(() => {
    console.log(session)
    console.log('HEREEEE:D')
    if (session.data) {
      router.push('/')
    }
  }, [router, session.data])
  console.log(providers)
  if (providers !== null) {
    return (
      <ThemeProvider theme={theme}>
        {Object.values(providers).map((provider) => (
          <StyledSignInPageContainer key={provider.name}>
            <StyledLogoImage
              id="preview-image-url"
              src={icons.HBP_LOGO.image}
              alt={icons.HBP_LOGO.altText}
            />
            <Typography variant="body1">
              Welcome to our internal tools portal!!
            </Typography>
            <br></br>
            <StyledButton
              bgColor={theme.palette.HBPNavy.main}
              onClick={() => signIn(provider.id)}
              width="medium"
            >
              Sign in with {provider.name}
            </StyledButton>
          </StyledSignInPageContainer>
        ))}
      </ThemeProvider>
    )
  }
  return <>this is not working</>
}

export async function getServerSideProps () {
  const providers = await getProviders()
  console.log(providers)
  return {
    props: { providers }
  }
}
