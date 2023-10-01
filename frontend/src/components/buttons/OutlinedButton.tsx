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

const OutlinedButton: FC<Props> = ({
  style,
  className,
  buttonText,
  onClick,
  divStyle,
  divClassName,
}) => {
  const defaultStyle: React.CSSProperties = {
    margin: "16px",
    height: "42px",
    width: "158px",
    borderRadius: "10px",
    borderWidth: "1px",
    borderColor: "#054BE2",
  };
  const buttonStyle = { ...defaultStyle, ...style };
  return (
    <div style={divStyle} className={divClassName}>
      <Button
        variant="outlined"
        style={buttonStyle}
        className={className}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default OutlinedButton;
