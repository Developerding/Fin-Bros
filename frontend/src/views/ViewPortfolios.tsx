import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../stores";
import OutlinedButton from "../components/buttons/OutlinedButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import DeleteModal from "../components/DeleteModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Auth } from "../components/Auth";

const ViewPortfolios = () => {
  // // components
  // const PortfolioPaper = styled(Paper)(({ theme }) => ({
  //   width: 280,
  //   height: 280,
  //   padding: theme.spacing(2),
  //   ...theme.typography.body2,
  //   textAlign: "center",
  //   borderRadius: "20px",
  // }));

  // const PopOutGrid = styled(Grid)(() => ({
  //   transition: "transform 0.15s ease-in-out",
  //   "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  // }));

  // specify datatypes for portfolio in portfolios
  interface allocation {
    stockName: string;
    averagePrice: number;
    percentage: number;
    differenceVsPriorPeriod: number;
  }

  interface portfolio {
    id: string;
    capital: number;
    dateTime: Date;
    name: string;
    description: string;
    totalPerformance: number;
    allocations: allocation[];
  }

  // portfolios data
  const [portfolios, setPortfolios] = useState([] as portfolio[]);
  // const [stockAnalytics, setStockAnalytics] = useState([]);
  // const [isHovering, setIsHovering] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const AppStore = useStores();

  // get portfolio data from backend
  useEffect(() => {
    AppStore.getPortfoliosController(AppStore.getUserId()).then(
      (response: any) => {
        setPortfolios(response);
        // setPortfolios(response.data);
      }
    );
  }, []);

  // when clicking into the portfolio
  const navigate = useNavigate();

  const handleClick = (portfolio: portfolio) => {
    navigate("/viewportfoliodetails", {
      state: {
        userId: AppStore.getUserId(),
        portfolioName: portfolio.name,
      },
    });
  };

  const editClick = (
    portfolio: portfolio,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    navigate("/editportfolio", {
      state: {
        userId: AppStore.getUserId(),
        portfolioName: portfolio.name,
      },
    });
  };
  // const HoverableStack = () => {
  //   const [isHovering, setIsHovering] = useState(null);

  //   const handleMouseEnter = (index: any) => {
  //     setIsHovering(index);
  //   };

  //   const handleMouseLeave = () => {
  //     setIsHovering(null);
  // };

  // function to render all portfolios via a loop
  return (
    <>
      <Auth />
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        {/* For the entire page */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">Welcome back!</Typography>
            <Typography variant="h3">Here are your portfolios</Typography>
          </Grid>

          {!portfolios ? (
            <Paper>
              <Typography variant="h3">
                No portfolios found. Create a portfolio!
              </Typography>
            </Paper>
          ) : (
            portfolios.map((portfolio, index) => (
              // Every single card is an item and a container
              <>
                <Grid item container key={index} xs={12} sm={12} md={6}>
                  <Paper
                    // onMouseEnter={() => handleMouseEnter(index)}
                    // onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(portfolio)}
                    elevation={3}
                    square={false}
                    sx={{
                      padding: 2,
                      cursor: "pointer",
                      minHeight: "250px",
                    }}
                  >
                    {/* For all the items within the paper */}
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 600, padding: 1 }}
                        >
                          {portfolio.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={6}>
                        <Typography>
                          $
                          {(portfolio.capital * (1 + portfolio.totalPerformance)).toFixed(2)}
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                          since creation date
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={6}>
                        <Stack direction="row">
                          {portfolio.totalPerformance >= 0 ? (
                            <ArrowUpwardIcon sx={{ color: "#64dd17" }} />
                          ) : (
                            <ArrowDownwardIcon sx={{ color: "#e31212" }} />
                          )}

                          <Typography
                            variant="h4"
                            sx={{
                              color:
                                portfolio.totalPerformance >= 0
                                  ? "#64dd17"
                                  : "#e31212",
                            }}
                          >
                            {(portfolio.totalPerformance * 100).toFixed(2)}%
                          </Typography>
                        </Stack>

                        <Typography variant="h6" color="text.secondary">
                          vs creation date
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <OutlinedButton
                          buttonText="Edit"
                          onClick={(event) => editClick(portfolio, event)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <PrimaryButton
                          buttonText="Delete"
                          onClick={(e) => {
                            e?.stopPropagation();
                            setDeleteModalOpen(true);
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={3}></Grid>
                    </Grid>
                  </Paper>

                  <DeleteModal
                    portfolioName={portfolio.name}
                    isOpen={isDeleteModalOpen}
                    setIsOpen={setDeleteModalOpen}
                  />
                </Grid>

                <Grid item container xs={12} sm={12} md={6}>
                  <TableContainer component={Paper} sx={{ maxHeight: "250px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Ticker</TableCell>
                          <TableCell align="left">Average Price</TableCell>
                          <TableCell align="left">Percentage</TableCell>
                          <TableCell align="left">Performance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {portfolio.allocations.map((allocation, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {allocation.stockName}
                            </TableCell>
                            <TableCell align="left">
                              ${allocation.averagePrice}
                            </TableCell>
                            <TableCell align="left">
                              {allocation.percentage}%
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                sx={{
                                  color:
                                    allocation.differenceVsPriorPeriod >= 0
                                      ? "#64dd17"
                                      : "e31212",
                                }}
                              >
                                {allocation.differenceVsPriorPeriod}%
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewPortfolios;
