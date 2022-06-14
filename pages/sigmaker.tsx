import type { NextPage } from "next";
import {
  Divider,
  FormControl,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../styles/theme";
import { ChangeEvent, useState } from "react";
import { icons } from "../styles/icons";
import { SignatureData } from "../lib/types";
import { StyledPageContainer, StyledButton } from "../styles/common";
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
  StyledLink,
  StyledInputField
} from "../pageStyles/sigmaker.styles";

const Sigmaker: NextPage = () => {
  const [formData, setFormData] = useState<SignatureData>({
    fullName: "",
    title: "",
    phone: "",
    email: "",
  });
  const [signatureData, setSignatureData] = useState<undefined | SignatureData>(
    undefined
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createInputField = (name: string, value: string, label: string) => (
    <StyledInputField
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      id="filled-size-small"
      variant="filled"
      size="small"
    />
  );

  const createSignature = () => {
    if (signatureData) {
      return (
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
                            <StyledLink href="mailto:${email}@hackbeanpot.com">
                              <>{signatureData.email}@hackbeanpot.com</>
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
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3"> Signature Maker </Typography>
        <Divider />
        <br />
        <Grid container spacing={2} sx={{ rowGap: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5"> Enter your info here! </Typography>
            <FormControl sx={{ my: 3 }}>
              <Stack spacing={3}>
                {createInputField("fullName", formData.fullName, "Full name")}
                {createInputField("title", formData.title, "Title")}
                {createInputField("phone", formData.phone, "Phone")}
                {createInputField(
                  "email",
                  formData.email,
                  "Email (@hackbeanpot.com)"
                )}
              </Stack>
            </FormControl>
            <div>
              <StyledButton
                size="large"
                color="info"
                variant="contained"
                onClick={() => {
                  setSignatureData(formData);
                  setFormData({
                    fullName: "",
                    title: "",
                    phone: "",
                    email: "",
                  });
                }}
              >
                Generate signature!
              </StyledButton>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {<div>{createSignature()}</div>}
          </Grid>
        </Grid>
      </StyledPageContainer>
    </ThemeProvider>
  );
};

export default Sigmaker;
