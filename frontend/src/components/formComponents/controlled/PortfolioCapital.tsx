import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {
  Box,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { FC, useState } from "react";
import validator from "validator";

interface Props {
  label: string;
  placeholder?: string;
  formControlId: string;
  formValue: number;
  formData: any;
  setFormControlState: React.Dispatch<React.SetStateAction<any>>;
  error?: boolean;
  errorText?: string;
  style?: {};
  className?: string;
}

const PortfolioCapital: FC<Props> = ({
  label,
  placeholder,
  formControlId,
  formValue,
  setFormControlState,
  error = false,
  errorText,
  formData,
  style,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControlState({ ...formData, [formControlId]: event.target.value });
  };

  //   const submitEvent

  return (
    <Box sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}>
      {/* {label && <Typography variant="body1">{label}:</Typography>} */}

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MonetizationOnOutlinedIcon />
            </InputAdornment>
          ),
        }}
        type="number"
        label={label}
        placeholder={placeholder}
        error={error && formValue <= 0}
        helperText={error && formValue <= 0 ? errorText : ""}
        value={formValue || ""}
        onChange={handleChange}
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default PortfolioCapital;
