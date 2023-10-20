import {
  Card,
  Box,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
  Container,
} from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PortfolioStock from "../components/PortfolioStock";

export const EditPortfolio = () => {
  return (
    <>
      {/* <NavBar /> */}

      <Container maxWidth="xl" sx={{ marginTop: "2%" }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="h2" sx={{ fontWeight: "500" }}>
              {/* Dynamic */}
              Portfolio
            </Typography>

            <Typography variant="subtitle1">Description</Typography>

            <Typography variant="subtitle1">Capital</Typography>
          </Grid>

          <Grid item xs={2}>
            {/* Dynamic */}
            {/* <Button
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#bdbdbd",
              }}
            >
              Save Portfolio
            </Button> */}

            <PrimaryButton
            buttonText="Save Portfolio"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{marginTop: "1%"}}>
            <Grid item xs={6}>
              {/* Aloy's frontend part goes here */}
              <Card>
                <CardContent>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card>
                <CardContent>
                  {/* Shoudl loop through all stocks for that portfolio */}
                  <PortfolioStock
                    stockName="Testing Stock"
                    currentPercentage={2}
                  />

                  <PortfolioStock
                    stockName="Testing Stock"
                    currentPercentage={2}
                  />

                  <PortfolioStock
                    stockName="Testing Stock"
                    currentPercentage={2}
                  />
                </CardContent>
              </Card>
            </Grid>
        </Grid>
      </Container>

      {/* <Grid
        container
        spacing={1}
        style={{ marginLeft: "5px", alignItems: "stretch" }}
      >
        <Grid xs={8} style={{ display: "flex", justifyContent: "start" }}>
          <Typography
            variant="h3"
            style={{ marginTop: "40px", marginBottom: "20px" }}
          >
            Portfolio Name
          </Typography>
        </Grid>
        <Grid xs={4}></Grid>
        <Grid
          xs={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography>Description</Typography>
          <Typography>Capital</Typography>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={2}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "#bdbdbd",
            }}
          >
            Create Portfolio
          </Button>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid
          xs={8}
          style={{ display: "flex", justifyContent: "start" }}
        ></Grid>
        <Grid xs={4}></Grid>
        <Grid
          xs={7}
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#bdbdbd",
              width: 9 / 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
            }}
          >
            <Box sx={{ width: 1 }}>
              <CardContent sx={{ display: "flex" }}>
                <TextField
                  id="Quantity"
                  label="Quantity"
                  rows={2}
                  type="text"
                  variant="filled"
                  color="secondary"
                  focused
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <TextField
                  id="Price"
                  label="Price"
                  rows={2}
                  type="text"
                  variant="filled"
                  color="secondary"
                  focused
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
              </CardContent>

              <CardContent sx={{ borderRadius: "16px" }}>
                <Accordion sx={{ marginBottom: "20px", borderRadius: "16px" }}>
                  <AccordionSummary>
                    <Typography>Stock Name 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Graph</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ marginBottom: "20px", borderRadius: "16px" }}>
                  <AccordionSummary>
                    <Typography>Stock Name 2 </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Graph</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ marginBottom: "20px", borderRadius: "16px" }}>
                  <AccordionSummary>
                    <Typography>Stock Name 3</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Graph</Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid
          xs={4}
          style={{
            marginTop: "20px",
            marginRight: "10px",
            borderRadius: "16px",
            marginBottom: "20px",
          }}
        >
          <Card sx={{ borderRadius: "16px", backgroundColor: "#bdbdbd" }}>
            <Box sx={{ gridTemplateAreas: `"name . . percentage"` }}>
              <CardContent>
                <Typography component="div">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `"stock . . percentage"`,
                      gridTemplateRows: "auto",
                    }}
                  >
                    <Box sx={{ gridArea: "stock", alignSelf: "center" }}>
                      <Typography style={{ alignContent: "center" }}>
                        Stock Name
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        gridArea: "percentage",
                        alignSelf: "center",
                        justifySelf: "end",
                      }}
                    >
                      25% &nbsp;
                      <Button variant="outlined"> + </Button> &nbsp;
                      <Button variant="outlined"> - </Button>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
              <CardContent>
                <Typography component="div">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `"stock . . percentage"`,
                      gridTemplateRows: "auto",
                    }}
                  >
                    <Box sx={{ gridArea: "stock", alignSelf: "center" }}>
                      <Typography style={{ alignContent: "center" }}>
                        Stock Name
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        gridArea: "percentage",
                        alignSelf: "center",
                        justifySelf: "end",
                      }}
                    >
                      25% &nbsp;
                      <Button variant="outlined"> + </Button> &nbsp;
                      <Button variant="outlined"> - </Button>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
              <CardContent>
                <Typography component="div">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `"stock . . percentage"`,
                      gridTemplateRows: "auto",
                    }}
                  >
                    <Box sx={{ gridArea: "stock", alignSelf: "center" }}>
                      <Typography style={{ alignContent: "center" }}>
                        Stock Name
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        gridArea: "percentage",
                        alignSelf: "center",
                        justifySelf: "end",
                      }}
                    >
                      25% &nbsp;
                      <Button variant="outlined"> + </Button> &nbsp;
                      <Button variant="outlined"> - </Button>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
              <CardContent>
                <Typography component="div">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `"stock . . percentage"`,
                      gridTemplateRows: "auto",
                    }}
                  >
                    <Box sx={{ gridArea: "stock", alignSelf: "center" }}>
                      <Typography style={{ alignContent: "center" }}>
                        Stock Name
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        gridArea: "percentage",
                        alignSelf: "center",
                        justifySelf: "end",
                      }}
                    >
                      25% &nbsp;
                      <Button variant="outlined"> + </Button> &nbsp;
                      <Button variant="outlined"> - </Button>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid> */}
    </>
  );
};

export default EditPortfolio;
