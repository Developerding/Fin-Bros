import { CardContent, InputAdornment, TextField, Typography,Stack, Button } from "@mui/material";
import React, { FC } from "react";

interface Props {
  style?: {};
  className?: string;
  stockName: string;
  currentPercentage: number;
  onClick?: () => void;
  divStyle?: {};
  divClassName?: string;
}

const PortfolioStock: FC<Props> = ({
    style,
    className,
    stockName,
    currentPercentage,
    onClick,
    divStyle,
    divClassName
}) => {
    const defaultStyle: React.CSSProperties = {
      }; 
      const styling = {...defaultStyle, ...style};

    return (
        <>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4"> {stockName}</Typography>

                    <Stack direction="row" justifyContent="space-around" spacing={2}>
                        {/* Unsure why the app still compiles with an error */}
                        <TextField  
                            placeholder={currentPercentage} 
                            type="number" 
                            InputProps={{ inputMode:'numeric', pattern: '[0-9]*',
                            endAdornment:<InputAdornment position="end">%</InputAdornment>
                            }}
                        />

                        <Button variant="outlined" onClick={onClick}>
                            <Typography variant="h3">
                                -
                            </Typography>
                        </Button>
                    </Stack>
                    
                </Stack>
                

            </CardContent>
        </>
        
    )
}

export default PortfolioStock;
