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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  label: string;
  placeholder?: string;
  formControlId: string;
  formValue: Dayjs | null;
  formData: any;
  setFormControlState: React.Dispatch<React.SetStateAction<any>>;
  error?: boolean;
  errorText?: string;
  style?: {};
  className?: string;
}

const PortfolioDate: FC<Props> = ({
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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}>
        {/* {label && <Typography variant="body1">{label}:</Typography>} */}

        <DatePicker
          disableFuture
          label={label}
          value={formValue ? dayjs(formValue) : null}
          //   className="w100"x
          onChange={(newValue) =>
            setFormControlState({
              ...formData,
              [formControlId]: newValue,
            })
          }
          sx={{
            "&.MuiTextField-root": {
              width: "100%",
            },
          }}
        />
        {error && !formValue && (
          <Typography variant="body2" color="error">
            {errorText}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default PortfolioDate;
