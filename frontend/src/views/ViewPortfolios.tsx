import NavBar from "../components/NavBar/NavBar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import axios from 'axios';
import { useState, useEffect } from "react";

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

  // get portfolio data from backend
  useEffect(() => {
    const getPortfoliosUrl = "http://localhost:8080/api/portfolio"; 
    const getPortfoliosFromBackend = async () => {
      await axios.get(getPortfoliosUrl)
      .then(response => {
        const portfoliosData = response.data
        console.log(portfoliosData)
        setPortfolios(portfoliosData)
      })
    }
    getPortfoliosFromBackend();
  }, []);

  // function to render all portfolios via a loop
  const renderPortfolios = () => {
    return portfolios.map(portfolio => {
      return (
        <Grid item xs={4}>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <PortfolioPaper elevation={3} square={false}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Box sx={{ p: 1 }} >
                    <Typography variant="h3">{portfolio.name}</Typography>
                  </Box>
                  <Box >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${portfolio.capital}</Typography>
                    <Typography variant="h6" color="text.secondary">Month to Date</Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                      <ArrowUpwardIcon sx={{ height: 22, color: '#64dd17'}}></ArrowUpwardIcon>
                      <Typography variant="h4" sx={{ textAlign: 'center', color: '#64dd17'}}>
                        7.62%
                      </Typography>
                    </Stack>
                    <Typography variant="h6" color="text.secondary">vs Prior Period</Typography>
                  </Box>
                  <Box>
                  <Typography variant="body2" color="text.secondary" sx={{overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}>
                    {portfolio.description}
                </Typography>
                  </Box>
                </Stack>
              </PortfolioPaper>
            </Stack>
          </Grid>
      )
    })
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          {renderPortfolios()}
        </Grid>
      </Container>
    </>
  );
};

export default ViewPortfolio;