import NavBar from "../components/NavBar/NavBar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../stores";
import App from "../App";

const ViewPortfolio = () => {

  // components
  const PortfolioPaper = styled(Paper)(({ theme }) => ({
    width: 280,
    height: 280,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    borderRadius: '20px',
  }));

  const PopOutGrid = styled(Grid)(() => ({
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  }))


  // specify datatypes for portfolio in portfolios
  interface portfolio {
    id: string;
    capital: number;
    dateTime: Date;
    name: string;
    description: string;
  }
  
  // portfolios data
  const [portfolios, setPortfolios] = useState([] as portfolio[]);
  const [isHovering, setIsHovering] = useState(false);
  const AppStore = useStores();

  // get portfolio data from backend
  useEffect(() => {
    AppStore.getPortfoliosController(AppStore.getUserId()).then((response: any) => {
      setPortfolios(response.data);
    }
    );
  }, []);

  // when clicking into the portfolio
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/viewportfoliodetails');
  };
  const editClick = () => {
    navigate('/editportfolio');
  }
  const HoverableStack = () => {
    const [isHovering, setIsHovering] = useState(null);
  
    const handleMouseEnter = (index:any) => {
      setIsHovering(index);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(null);
    };


  // function to render all portfolios via a loop
  return (
    <>
      <h2>Welcome back!</h2>
      <h4>Here are your portfolios:</h4>
      <Container maxWidth={false} sx={{ marginTop: 3, maxWidth: '90%', marginLeft: 0 }}>
        <Grid container spacing={3}>
          {portfolios.map((portfolio, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Stack
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      height: '100%',
                    }}
                  >
                    <Paper elevation={3} sx={{ width: 1, display:"flex", height:"100%", paddingY:1, justifyContent:"start", paddingLeft:2 }}>
                    <Stack direction="column" justifyContent="center" sx={{width: 1}}>
                    <Stack direction="row" alignItems="center" spacing={10}>
                        <Box sx={{ p: 1 }}>
                          <Typography variant="h3">{portfolio.name}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            ${portfolio.capital}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">Month to Date</Typography>
                        </Box>
                        <Box>
                          <Stack direction="row" justifyContent="center" alignItems="center">
                            <ArrowUpwardIcon sx={{ height: 22, color: '#64dd17' }}></ArrowUpwardIcon>
                            <Typography variant="h4" sx={{ textAlign: 'center', color: '#64dd17' }}>
                              7.62%
                            </Typography>
                          </Stack>
                          <Typography variant="h6" color="text.secondary">vs Prior Period</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}>
                            {portfolio.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction={"row"} justifyContent={"end"} sx={{paddingRight: 1, paddingBottom: 1}}>
                      <Button onClick={editClick}>
                        <Typography variant="h6">Edit Portfolio</Typography>
                      </Button>
                      <Button>
                        <Typography variant="h6">Delete Portfolio</Typography>
                      </Button>
                    </Stack>
                    </Stack>
                    </Paper>
                  </Stack>
                </Grid>

                {
                isHovering === index && 
                (
                  <Grid item xs={12} sm={5}>
                    <Stack
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        height: '100%',
                      }}
                    >
                      <Paper elevation={3} sx={{ width: 1 }}>
                      <Box sx={{ p: 1 }}>
                            <Typography variant="h3">Portfolio Breakdown</Typography>
                      </Box>
                      <Grid container key={index} sx={{paddingX:2}}>
                        <Grid item xs={2}>
                          <Typography variant="h6">Ticker</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="h6">Average Price</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h6">Percentage</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography variant="h6">Performance</Typography>
                        </Grid>
                      </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              {
                                portfolio.allocations.map((allocation: any, index:any) => (
                                  <Grid container key={index} sx={{paddingX:2, paddingY:1}}>
                                    <Grid item xs={2}>
                                      <Typography variant="h6">{allocation.stockName}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography variant="h6">${allocation.averagePrice}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Typography variant="h6">{allocation.percentage}%</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                    <Box>
                                      <Stack direction="row" alignItems="center" spacing={1}>
                                        <ArrowUpwardIcon sx={{ height: 22, color: '#64dd17' }}></ArrowUpwardIcon>
                                        <Typography variant="h4" sx={{ textAlign: 'center', color: '#64dd17' }}>
                                          7.62%
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">vs Prior Period</Typography>
                                      </Stack>
                                    </Box>
                                    </Grid>
                                  </Grid>
                                ))
                              }
                            </Grid>
                          </Grid>
                      </Paper>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
  return (
    <>
      <HoverableStack />
    </>
  );
}


export default ViewPortfolio;