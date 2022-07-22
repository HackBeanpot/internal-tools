import React from 'react'
import { SignatureData } from '../../lib/types'
import {
  StyledContentContainer,
  StyledGmailHeader,
  StyledLogoContainer,
  StyledTable,
  StyledSignatureName,
  StyledLogoImage,
  StyledSignatureText,
  StyledPhoneNumber,
  StyledLinkContainer,
  StyledLink
} from '../../styles/emailSignature'
import { StyledPageContainer } from '../../styles/common'
import { icons } from '../../styles/icons'

interface EmailSignatureProps {
  signatureData?: SignatureData
}

export default function EmailSignature ({ signatureData }: EmailSignatureProps) {
  return <>
    {signatureData &&
      (
        <div>
          <StyledGmailHeader variant="h4">
            Paste this into Gmail!
          </StyledGmailHeader>
          <StyledPageContainer>
            <StyledTable cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <StyledLogoContainer valign="top">
                    <StyledLogoImage
                      id="preview-image-url"
                      src={icons.HBP_LOGO.image}
                      alt={icons.HBP_LOGO.altText}
                    />
                  </StyledLogoContainer>
                  <StyledContentContainer>
                    <table cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr>
                          <StyledSignatureName colSpan={2}>
                            {signatureData.fullName}
                          </StyledSignatureName>
                        </tr>
                        <tr>
                          <StyledSignatureText colSpan={2}>
                            {signatureData.title}
                          </StyledSignatureText>
                        </tr>
                        <tr>
                          <StyledSignatureText colSpan={2}>
                            <strong>HackBeanpot, Inc.</strong>
                          </StyledSignatureText>
                        </tr>
                        <tr>
                          <StyledPhoneNumber>
                            {signatureData.phone}
                          </StyledPhoneNumber>
                        </tr>
                        <tr>
                          <StyledLinkContainer valign="top">
                            <StyledLink
                              href="https://hackbeanpot.com"
                              target="_blank"
                            >
                              www.hackbeanpot.com
                            </StyledLink>
                          </StyledLinkContainer>
                        </tr>
                        <tr>
                          <StyledSignatureText>
                            <StyledLink href={`mailto:${signatureData.email}@hackbeanpot.com`}>
                              <a>{signatureData.email}@hackbeanpot.com</a>
                            </StyledLink>
                          </StyledSignatureText>
                        </tr>
                      </tbody>
                    </table>
                  </StyledContentContainer>
                </tr>
              </tbody>
            </StyledTable>
          </StyledPageContainer>
        </div>
      )}
  </>
}
