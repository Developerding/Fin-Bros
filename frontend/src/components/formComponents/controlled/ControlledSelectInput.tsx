import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  Typography,
} from "@mui/material";
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
  options: string[];
}

const ControlledSelectInput: FC<Props> = ({
  label,
  placeholder,
  formControlId,
  formValue,
  setFormControlState,
  error = false,
  errorText,
  style,
  className,
  options,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFormControlState({
      ...FormData,
      [formControlId]: event.target.value as string,
    });
  };

  //   const submitEvent

  return (
    <Box sx={{ margin: "16px 16px 0px 16px", width: "calc(100%-32px)" }}>
      <Typography variant="body1">{label}: </Typography>
      <FormControl fullWidth>
        <InputLabel style={{ marginTop: "12px" }}>Select {label}</InputLabel>
        <Select
          value={formValue}
          label="Age"
          onChange={handleChange}
          style={{
            marginTop: "12px",
            width: "100%",
          }}
          error={
            error &&
            (formValue == "" || formValue == undefined || formValue == null)
          }
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {options.map((option: string, index: number) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
        {error &&
          (formValue == "" || formValue == undefined || formValue == null) && (
            <FormHelperText style={{ color: "#D32F2F" }}>
              {errorText}
            </FormHelperText>
          )}
      </FormControl>
    </Box>
  );
};

export default ControlledSelectInput;
