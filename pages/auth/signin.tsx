import { getProviders, signIn } from "next-auth/react"
import { StyledLogoImage } from "../../pageStyles/sigmaker.styles";
import { StyledButton } from '../../styles/common';
import { StyledSignInPageContainer } from "../../pageStyles/signin.styles";
import { icons } from '../../styles/icons';


export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <StyledSignInPageContainer key={provider.name}>
           <StyledLogoImage
                      id="preview-image-url"
                      src={icons.HBP_LOGO.image}
                      alt={icons.HBP_LOGO.altText}
                    />
          <StyledButton onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </StyledButton>
        </StyledSignInPageContainer>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}