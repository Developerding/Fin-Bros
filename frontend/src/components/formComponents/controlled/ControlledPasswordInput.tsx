import { Box, Input, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";

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

const ControlledPasswordInput: FC<Props> = ({
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
      {/* <Typography variant="body1">{label}:</Typography> */}

      <TextField
        type="password"
        multiline
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

export default ControlledPasswordInput;
