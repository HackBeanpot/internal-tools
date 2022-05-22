import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";

const Sigmaker: NextPage = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default Sigmaker;
