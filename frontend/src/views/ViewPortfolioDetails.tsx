import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";

function ViewPortfolioDetails() {
  return (
    <>
      <NavBar />

      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2">Portfolio</Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography variant="subtitle1">Portfolio Name</Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography variant="subtitle1">Capital</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h3">Analytics</Typography>
            <Card>
                <CardContent>
                    something
                </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h3">Overall Returns</Typography>
            <Card>
                <CardContent>
                    something
                </CardContent>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Typography variant="h3">Allocation</Typography>
            <Card>
                <CardContent>
                    something
                </CardContent>
            </Card>
          </Grid>

        </Grid>


      </Container>
    </>
  );
}

export default ViewPortfolioDetails;
