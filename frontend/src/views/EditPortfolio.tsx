import { Typography, TextField, Grid, Button } from "@mui/material";
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import NavBar from "../components/NavBar/NavBar";

export const EditPortfolio = () => {
    return (
        <>
            <NavBar />


            <Grid container spacing={2} style={{ marginLeft: '5px', alignItems: 'stretch' }}>
                <Grid xs={8} style={{ display: 'flex', justifyContent: 'start' }}>
                    <Typography variant="h3" style={{ marginTop: '40px', marginBottom: '20px' }}>Portfolio Name</Typography>
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                    <Typography>Description</Typography>
                    <Typography>Capital</Typography>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={2}>
                    <Button variant="contained" sx={{ width: '100%', marginTop: '20px', backgroundColor: '#bdbdbd' }}>Create Portfolio</Button>
                </Grid>
                {/* <Grid xs={1}></Grid> */}
                <Grid xs={8} style={{ display: 'flex', justifyContent: 'start' }}>

                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={7} style={{ display: 'flex', justifyContent: 'start', marginTop: '20px', marginBottom: '20px' }}>
                    <Card sx={{ backgroundColor: '#bdbdbd', width: 9 / 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius:'16px' }}>
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
                                        sx={{ width: '100%', marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}
                                    />
                                    <TextField
                                        id="Price"
                                        label="Price"
                                        rows={2}
                                        type="text"
                                        variant="filled"
                                        color="secondary"
                                        focused
                                        sx={{ width: '100%', marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}
                                    />
                                </CardContent>

                                <CardContent sx={{borderRadius:'16px'}}>
                                    <Accordion sx={{ marginBottom: '20px', borderRadius:'16px'}}>
                                        <AccordionSummary>
                                            <Typography>Stock Name 1</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Graph</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ marginBottom: '20px', borderRadius:'16px' }}>
                                        <AccordionSummary>
                                            <Typography>Stock Name 2 </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Graph</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ marginBottom: '20px', borderRadius:'16px' }}>
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
                <Grid xs={4} style={{ marginTop: '20px', marginRight: '10px', borderRadius: '16px', marginBottom: '20px' }}>
                    <Card sx={{borderRadius:'16px',  backgroundColor: '#bdbdbd', }}>
                        <Box sx={{gridTemplateAreas: `"name . . percentage"`}}>
                            <CardContent>
                                <Typography component="div">
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateAreas: `"stock . . percentage"`, 
                                        gridTemplateRows: 'auto'}}
                                        >
                                        <Box sx={{gridArea: 'stock', alignSelf: 'center'}}>
                                            <Typography style={{alignContent: 'center'}}>Stock Name</Typography>
                                        </Box>
                                        <Box sx={{gridArea: 'percentage', alignSelf: 'center', justifySelf: 'end'}}>
                                            25% &nbsp;
                                            <Button variant='outlined'> + </Button> &nbsp;
                                            <Button variant='outlined'> - </Button>
                                        </Box>
                                    </Box>
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography component="div">
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateAreas: `"stock . . percentage"`, 
                                        gridTemplateRows: 'auto'}}
                                        >
                                        <Box sx={{gridArea: 'stock', alignSelf: 'center'}}>
                                            <Typography style={{alignContent: 'center'}}>Stock Name</Typography>
                                        </Box>
                                        <Box sx={{gridArea: 'percentage', alignSelf: 'center', justifySelf: 'end'}}>
                                            25% &nbsp;
                                            <Button variant='outlined'> + </Button> &nbsp;
                                            <Button variant='outlined'> - </Button>
                                        </Box>
                                    </Box>
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography component="div">
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateAreas: `"stock . . percentage"`, 
                                        gridTemplateRows: 'auto'}}
                                        >
                                        <Box sx={{gridArea: 'stock', alignSelf: 'center'}}>
                                            <Typography style={{alignContent: 'center'}}>Stock Name</Typography>
                                        </Box>
                                        <Box sx={{gridArea: 'percentage', alignSelf: 'center', justifySelf: 'end'}}>
                                            25% &nbsp;
                                            <Button variant='outlined'> + </Button> &nbsp;
                                            <Button variant='outlined'> - </Button>
                                        </Box>
                                    </Box>
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography component="div">
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateAreas: `"stock . . percentage"`, 
                                        gridTemplateRows: 'auto'}}
                                        >
                                        <Box sx={{gridArea: 'stock', alignSelf: 'center'}}>
                                            <Typography style={{alignContent: 'center'}}>Stock Name</Typography>
                                        </Box>
                                        <Box sx={{gridArea: 'percentage', alignSelf: 'center', justifySelf: 'end'}}>
                                            25% &nbsp;
                                            <Button variant='outlined'> + </Button> &nbsp;
                                            <Button variant='outlined'> - </Button>
                                        </Box>
                                    </Box>
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default EditPortfolio;