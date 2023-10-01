import { Person } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
  formValue: string;
  setFormControlState: React.Dispatch<React.SetStateAction<any>>;
  error?: boolean;
  errorText?: string;
  style?: {};
  className?: string;
}

const LoginInput: FC<Props> = ({
  label,
  placeholder,
  formControlId,
  formValue,
  setFormControlState,
  error = false,
  errorText,
  style,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControlState({ ...FormData, [formControlId]: event.target.value });
  };

  //   const submitEvent

  return (
    <Box sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}>
      {/* {label && <Typography variant="body1">{label}:</Typography>} */}

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon />
            </InputAdornment>
          ),
        }}
        label={label}
        placeholder={placeholder}
        error={error && !validator.isEmail(formValue)}
        helperText={error && !validator.isEmail(formValue) ? errorText : ""}
        value={formValue}
        onChange={handleChange}
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default LoginInput;
