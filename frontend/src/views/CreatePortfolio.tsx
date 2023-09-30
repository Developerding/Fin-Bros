import { Typography, TextField, Grid, Button } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";

export const CreatePortfolio = () => {
    return (
      <>
        <NavBar />
        <Grid container spacing={2}>
            <Grid xs={2}></Grid>
            <Grid xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h2" style={{ marginTop: '20px' }}>Create a new portfolio</Typography>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
                <TextField
                    id="portfolioName"
                    label="Portfolio Name"
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                />
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
                <TextField
                    id="portfolioDescription"
                    label="Portfolio Description"
                    multiline
                    rows={4}
                    type="text"
                    sx={{ width: '100%', marginTop: '20px' }}
                />
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
                <TextField
                    id="portfolioCapital"
                    label="Portfolio Capital"
                    type="number"
                    sx={{ width: '100%', marginTop: '20px' }}
                />
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
                <Button variant="contained" sx={{ width: '100%', marginTop: '20px' }}>Create Portfolio</Button>
            </Grid>
            <Grid xs={2}></Grid>
        </Grid>
      </>
    );
};

export default CreatePortfolio;
