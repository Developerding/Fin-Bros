import { Button } from "@mui/material";
import React, { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  style?: {};
  className?: string;
  buttonText: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  divStyle?: {};
  divClassName?: string;
  isLoading?: boolean;
}

const PrimaryButton: FC<Props> = ({
  style,
  className,
  buttonText,
  onClick,
  divStyle,
  divClassName,
  isLoading = false,
}) => {
  const defaultStyle: React.CSSProperties = {
    margin: "16px",
    backgroundColor: "#054BE2",
    height: "42px",
    width: "158px",
    borderRadius: "10px",
    color: "white",
  };
  const buttonStyle = { ...defaultStyle, ...style };
  return (
    <div style={divStyle} className={divClassName}>
      {!isLoading ? (
        <Button
          variant="contained"
          style={buttonStyle}
          className={className}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      ) : (
        <LoadingButton
          style={buttonStyle}
          className={className}
          loading
          variant="outlined"
        />
      )}
    </div>
  );
};

export default PrimaryButton;
