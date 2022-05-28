import type { NextPage } from "next";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../styles/theme";
import { ChangeEvent, useState } from "react";

const Sigmaker: NextPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    email: "",
  });

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

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Signature Maker </Typography>
        <Divider />
        <br />
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
            onClick={() =>
              setFormData({ fullName: "", title: "", phone: "", email: "" })
            }
          >
            Generate signature!
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Sigmaker;
