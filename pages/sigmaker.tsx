import type { NextPage } from "next";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../styles/theme";
import { ChangeEvent, useState } from "react";
import { icons } from "../styles/icons"
import Link from "next/link";

interface SignatureData {
  fullName: string
  title: string
  phone: string
  email: string
}
const Sigmaker: NextPage = () => {
  const [formData, setFormData] = useState<SignatureData>({
    fullName: "",
    title: "",
    phone: "",
    email: "",
  });

  const [signatureData, setSignatureData] = useState<undefined | SignatureData>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createInputField = (name: string, value: string, label: string) => (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      id="filled-size-small"
      variant="filled"
      size="small"
      sx={{ width: "25ch" }}
    />
  );

  const createSignature = () => {
    if (signatureData) {
      return (
        <div>
          <Typography variant="h4" sx={{ pb: "16px" }}>
            Paste this into Gmail!
          </Typography>
          <Container>
            <table cellPadding={0} cellSpacing={0} className="table">
              <tbody>
                <tr>
                  <td valign="top" className="logoContainer">
                    <img className="logo" id="preview-image-url" src={icons.HBP_LOGO.image} alt={icons.HBP_LOGO.altText}/>
                  </td>
                  <td className="contentContainer">
                    <table cellPadding={0} cellSpacing={0} className="table">
                      <tbody>
                        <tr>
                          <td colSpan={2} className="name">{signatureData.fullName}</td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="signatureText">{signatureData.title}</td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="signatureText">
                            <strong>HackBeanpot, Inc.</strong>
                          </td>
                        </tr>
                        <tr>
                          <td className="phoneNumber">{signatureData.phone}</td>
                        </tr>
                        <tr>
                          <td valign="top" className="linkContainer">
                            <Link href="https://hackbeanpot.com" className="link" target="_blank">
                              www.hackbeanpot.com
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="signatureText">
                            <a href="mailto:${email}@hackbeanpot.com" className="link">{signatureData.email}@hackbeanpot.com</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
        </div>
      )
    }
    else {
      return (
        <></>
      )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
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
              <Button
                size="large"
                color="info"
                variant="contained"
                onClick={() => {
                  setSignatureData(formData)
                  setFormData({ fullName: "", title: "", phone: "", email: "" })
                }}
              >
                Generate signature!
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {<div>
              {createSignature()}
            </div>}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Sigmaker;
