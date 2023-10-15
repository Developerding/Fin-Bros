import { Button } from "@mui/material";
import React, { FC } from "react";

interface Props {
  style?: {};
  className?: string;
  buttonText: string;
  onClick?: () => void;
  divStyle?: {};
  divClassName?: string;
}

const PrimaryButton: FC<Props> = ({
  style,
  className,
  buttonText,
  onClick,
  divStyle,
  divClassName,
}) => {
  const defaultStyle: React.CSSProperties = {
    margin: "16px",
    backgroundColor: "#054BE2",
    height: "42px",
    width: "158px",
    borderRadius: "10px",
    color:"white",
  };
  const buttonStyle = { ...defaultStyle, ...style };
  return (
    <div style={divStyle} className={divClassName}>
      <Button
        variant="contained"
        style={buttonStyle}
        className={className}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PrimaryButton;
