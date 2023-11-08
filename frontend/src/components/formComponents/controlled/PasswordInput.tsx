import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";

interface Props {
  label: string;
  placeholder?: string;
  formControlId: string;
  formValue: string;
  formData: any;
  setFormControlState: React.Dispatch<React.SetStateAction<any>>;
  error?: boolean;
  errorText?: string;
  style?: {};
  className?: string;
}

const PasswordInput: FC<Props> = ({
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

  const [showPassword, setShowPassword] = useState(false);

  //   const submitEvent

  return (
    <Box sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}>
      <TextField
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlinedIcon />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={(event) => {
                //   event.preventDefault();
                //   setShowPassword(!showPassword);
                // }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={label}
        placeholder={placeholder}
        error={
          error &&
          (formValue == "" || formValue == undefined || formValue == null)
        }
        helperText={
          error &&
          (formValue == "" || formValue == undefined || formValue == null)
            ? errorText
            : ""
        }
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

export default PasswordInput;
