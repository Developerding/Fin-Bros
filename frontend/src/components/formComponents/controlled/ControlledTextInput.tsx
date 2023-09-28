import { Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

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

const ControlledTextInput: FC<Props> = ({
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
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControlState({ ...FormData, [formControlId]: event.target.value });
  };

  //   const submitEvent

  return (
    <>
      <TextField
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
        style={{ margin: "20px" }}
      />
    </>
  );
};

export default ControlledTextInput;
