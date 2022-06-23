import { getProviders, signIn } from "next-auth/react"
import { StyledLogoImage } from "../../pageStyles/sigmaker.styles";
import { StyledButton, StyledPageContainer } from '../../styles/common';
import { icons } from '../../styles/icons';


export default function SignIn({ providers }) {
  return (
    <StyledPageContainer>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
           <StyledLogoImage
                      id="preview-image-url"
                      src={icons.HBP_LOGO.image}
                      alt={icons.HBP_LOGO.altText}
                    />
          <StyledButton onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </StyledButton>
        </div>
      ))}
    </StyledPageContainer>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}