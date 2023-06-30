import * as React from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Stack,
} from "@mui/material";
import { StyledFormControl } from "./templateDropdown.styles";
import { theme } from "../../styles/theme";
import { MdContentCopy } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import TopRightSnackBar from "../snackBar/topRightSnackBar";

type CabinDropdownProps = {
  items: string[];
};

export default function CabinDropdown({ items }: CabinDropdownProps) {
  const [selectedItem, setSelectedItem] = React.useState("");
  // if false, the copy icon will appear
  // if true, the checkmark will appear
  const [copied, setCopied] = React.useState(false);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
    setCopied(false);
    setOpenSnackBar(false);
  };

  return (
    <>
      <StyledFormControl style={{ width: "9em", display: "inline-block" }}>
        <Select
          value={selectedItem}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{
            width: "9em",
            backgroundColor: theme.palette.Grey.main,
            fontSize: "0.9em",
          }}
        >
          <MenuItem value="" style={{ fontSize: "0.9em" }}>
            <Typography style={{ fontSize: "0.9em" }}>Cabin</Typography>
          </MenuItem>
          {items.map((item: string, index) => (
            <MenuItem key={index} value={item} style={{ fontSize: "0.9em" }}>
              <Stack direction="row" spacing={2}>
                <Typography style={{ fontSize: "0.9em" }}>{item}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
        {copied ? (
          <IoMdCheckmark
            size={30}
            style={{
              color: "green",
              marginLeft: "1em",
              position: "absolute",
              top: "21%",
            }}
          />
        ) : (
          <MdContentCopy
            size={30}
            color="#5e5d5d"
            style={{
              marginLeft: "1em",
              position: "absolute",
              top: "21%",
            }}
            onClick={() => {
              navigator.clipboard.writeText(selectedItem);
              setCopied(true);
              setOpenSnackBar(true);
            }}
          />
        )}

        {openSnackBar && <TopRightSnackBar message={"Copied to Clipboard"} />}
      </StyledFormControl>
    </>
  );
}
