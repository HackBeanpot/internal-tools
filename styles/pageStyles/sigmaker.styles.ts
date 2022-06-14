import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledGmailHeader = styled(Typography)({
  paddingBottom: 16,
});

const StyledTable = styled("table")({
  background: "none",
  borderWidth: 0,
  border: 0,
  margin: 0,
  padding: 0,
});

const StyledLogoContainer = styled("td")({
  paddingRight: 24,
  border: 0,
});

const StyledContentContainer = styled("td")({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 12,
  paddingRight: 0,
  lineHeight: "21px",
});

const StyledSignatureName = styled("td")({
  paddingBottom: 5,
  color: "#1B365D",
  fontWeight: "bold",
  fontSize: 18,
  fontFamily: `'Nunito Sans', Helvetica, sans-serif`,
});

const StyledLogoImage = styled("img")({
  height: 132,
});

const StyledSignatureText = styled("td")({
  color: "#1B365D",
  fontSize: 14,
  fontFamily: `'Nunito Sans', Helvetica, sans-serif`,
});

const StyledPhoneNumber = styled("td")({
  color: "#1B365D",
  textDecoration: "none",
  fontSize: 14,
  fontFamily: `'Nunito Sans', Helvetica, sans-serif`,
});

const StyledLinkContainer = styled("td")({
  verticalAlign: "top",
  color: "#1B365D",
  fontSize: 14,
  fontFamily: `'Nunito Sans', Helvetica, sans-serif`,
});

const StyledLink = styled(Link)({
    color: '#52A1B4',
    textDecoration: 'none',
    fontWeight: 'normal',
    fontSize: 14
  });
  

export {
  StyledGmailHeader,
  StyledTable,
  StyledLogoContainer,
  StyledContentContainer,
  StyledSignatureName,
  StyledLogoImage,
  StyledSignatureText,
  StyledPhoneNumber,
  StyledLinkContainer,
  StyledLink
};
