import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";

function ViewPortfolioDetails() {
  return (
    <>
      <NavBar />

      <Container maxWidth="xl" sx={{ marginTop: "2%" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ fontWeight: "500" }}>
              Portfolio
            </Typography>

            <Typography variant="subtitle1">Description</Typography>

            <Typography variant="subtitle1">Capital</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: "1%" }}>
          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Analytics
            </Typography>
            <Card>
              <CardContent>something</CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Overall Returns
            </Typography>
            <Card>
              <CardContent>something</CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Allocation
            </Typography>
            <Card>
              <CardContent>something</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ViewPortfolioDetails;
