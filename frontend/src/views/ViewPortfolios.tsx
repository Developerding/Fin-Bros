import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../stores";
import OutlinedButton from "../components/buttons/OutlinedButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Modal } from "@mui/base";
import DeleteModal from "../components/DeleteModal";

const ViewPortfolio = () => {
  // components
  const PortfolioPaper = styled(Paper)(({ theme }) => ({
    width: 280,
    height: 280,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    borderRadius: "20px",
  }));

  const PopOutGrid = styled(Grid)(() => ({
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  }));

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
  const [isHovering, setIsHovering] = useState(false);
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
  const HoverableStack = () => {
    const [isHovering, setIsHovering] = useState(null);

    const handleMouseEnter = (index: any) => {
      setIsHovering(index);
    };

    const handleMouseLeave = () => {
      setIsHovering(null);
    };

    // function to render all portfolios via a loop
    return (
      <>
        {/* modal component */}

        <h2>Welcome back!</h2>
        <h4>Here are your portfolios:</h4>
        <Container
          maxWidth={false}
          sx={{
            marginTop: 3,
            maxWidth: "90%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3}>
            {!portfolios ? (
              <Paper
                sx={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  No portfolios found
                </Typography>
              </Paper>
            ) : (
              portfolios.map((portfolio, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                      <Stack
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(portfolio)}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          height: "100%",
                        }}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            width: 1,
                            display: "flex",
                            height: "100%",
                            paddingY: 2,
                            justifyContent: "start",
                            paddingLeft: 2,
                          }}
                        >
                          <Stack
                            direction="column"
                            justifyContent="center"
                            sx={{ width: 1 }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={10}
                            >
                              <Box sx={{ p: 1 }}>
                                <Typography variant="h3">
                                  {portfolio.name}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="h4"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  ${portfolio.capital * (1 + portfolio.totalPerformance)}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                  since creation date
                                </Typography>
                              </Box>
                              <Box>
                                <Stack
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  {
                                    portfolio.totalPerformance >= 0 && <ArrowUpwardIcon
                                    sx={{ height: 22, color: "#64dd17" }}
                                  ></ArrowUpwardIcon>
                                  }
                                  {
                                    portfolio.totalPerformance < 0 && <ArrowDownwardIcon
                                    sx={{
                                      height: 22,
                                      color: "#e31212",
                                    }}
                                  ></ArrowDownwardIcon>
                                  }
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      textAlign: "center",
                                      color: portfolio.totalPerformance >= 0 ? "#64dd17" : "e31212",
                                    }}
                                  >
                                    {portfolio.totalPerformance}%
                                  </Typography>
                                </Stack>
                                <Typography variant="h6" color="text.secondary">
                                  vs creation date
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "horizontal",
                                  }}
                                >
                                  {portfolio.description}
                                </Typography>
                              </Box>
                            </Stack>
                            <Stack
                              direction={"row"}
                              justifyContent={"end"}
                              sx={{ paddingRight: 1, paddingBottom: 1 }}
                            >
                              {/* <Button onClick={editClick}>
                        <Typography variant="h6">Edit Portfolio</Typography>
                      </Button> */}
                              <OutlinedButton
                                buttonText="Edit"
                                onClick={(event) => editClick(portfolio, event)}
                              />
                              <PrimaryButton
                                buttonText="Delete"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  setDeleteModalOpen(true);
                                }}
                              ></PrimaryButton>
                            </Stack>
                          </Stack>
                        </Paper>
                      </Stack>
                    </Grid>
                    <DeleteModal
                      portfolioName={portfolio.name}
                      isOpen={isDeleteModalOpen}
                      setIsOpen={setDeleteModalOpen}
                    />

                    {isHovering === index && (
                      <Grid item xs={12} sm={5}>
                        <Stack
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            height: "100%",
                          }}
                        >
                          <Paper elevation={3} sx={{ width: 1 }}>
                            <Box sx={{ p: 1 }}>
                              <Typography variant="h3">
                                Portfolio Breakdown
                              </Typography>
                            </Box>
                            <Grid container key={index} sx={{ paddingX: 2 }}>
                              <Grid item xs={2}>
                                <Typography variant="h6">Ticker</Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="h6">
                                  Average Price
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="h6">Percentage</Typography>
                              </Grid>
                              <Grid item xs={5}>
                                <Typography variant="h6">
                                  Performance
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12}>
                                {portfolio.allocations.map(
                                  (allocation: any, index: any) => (
                                    <Grid
                                      container
                                      key={index}
                                      sx={{ paddingX: 2, paddingY: 1 }}
                                    >
                                      <Grid item xs={2}>
                                        <Typography variant="h6">
                                          {allocation.stockName}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Typography variant="h6">
                                          ${allocation.averagePrice}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography variant="h6">
                                          {allocation.percentage}%
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={5}>
                                        <Box>
                                          <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                          >
                                            {allocation.differenceVsPriorPeriod >= 0 && 
                                            <ArrowUpwardIcon
                                              sx={{
                                                height: 22,
                                                color: "#64dd17",
                                              }}
                                            ></ArrowUpwardIcon>
                                            }
                                            {allocation.differenceVsPriorPeriod < 0 && 
                                            <ArrowDownwardIcon
                                              sx={{
                                                height: 22,
                                                color: "#e31212",
                                              }}
                                            ></ArrowDownwardIcon>
                                            }
                                            <Typography
                                              variant="h4"
                                              sx={{
                                                textAlign: "center",
                                                color: allocation.differenceVsPriorPeriod >= 0 ? "#64dd17" : "#e31212",
                                              }}
                                            >
                                              {allocation.differenceVsPriorPeriod}%
                                            </Typography>
                                            <Typography
                                              variant="h6"
                                              color="text.secondary"
                                            >
                                              vs creation date
                                            </Typography>
                                          </Stack>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  )
                                )}
                              </Grid>
                            </Grid>
                          </Paper>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </>
    );
  };
  return (
    <>
      <HoverableStack />
    </>
  );
};

export default ViewPortfolio;
