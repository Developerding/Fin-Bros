import { Typography, TextField, Grid, Box, MenuList, MenuItem, Paper, ListItemText, Card, CardContent, Button, ListItem } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import { ChangeEvent, useRef, useState } from "react";

export const CreatePortfolio = () => {
    const [portfolioName, setPortfolioName] = useState('');
    const [portfolioNameError, setPortfolioNameError] = useState(false);
    const [portfolioDescription, setPortfolioDescription] = useState('');
    const [portfolioDescriptionError, setPortfolioDescriptionError] = useState(false)
    const [portfolioCapital, setPortfolioCapital] = useState('');
    const [portfolioCapitalError, setPortfolioCapitalError] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
    const [portflio, setPortfolio] = useState<{}>({});
    const stockSearchInputRef = useRef<HTMLInputElement | null>(null);
    const stocks = [
        {"name": "Apple Inc.", "ticker": "AAPL"},
        {"name": "Microsoft Corp.", "ticker": "MSFT"},
        {"name": "Amazon.com Inc.", "ticker": "AMZN"},
        {"name": "Alphabet Inc.", "ticker": "GOOGL"},
        {"name": "Facebook, Inc.", "ticker": "FB"},
        {"name": "Berkshire Hathaway Inc.", "ticker": "BRK.A"},
        {"name": "Tesla, Inc.", "ticker": "TSLA"},
        {"name": "NVIDIA Corporation", "ticker": "NVDA"},
        {"name": "JPMorgan Chase & Co.", "ticker": "JPM"},
        {"name": "Johnson & Johnson", "ticker": "JNJ"},
        {"name": "Visa Inc.", "ticker": "V"},
        {"name": "Procter & Gamble Co.", "ticker": "PG"},
        {"name": "UnitedHealth Group Inc.", "ticker": "UNH"},
        {"name": "Home Depot Inc.", "ticker": "HD"},
        {"name": "Mastercard Inc.", "ticker": "MA"},
        {"name": "Bank of America Corp.", "ticker": "BAC"},
        {"name": "Walt Disney Co.", "ticker": "DIS"},
        {"name": "Netflix Inc.", "ticker": "NFLX"},
        {"name": "Adobe Inc.", "ticker": "ADBE"},
        {"name": "PayPal Holdings Inc.", "ticker": "PYPL"},
        {"name": "Exxon Mobil Corp.", "ticker": "XOM"},
        {"name": "Coca-Cola Co.", "ticker": "KO"},
        {"name": "Intel Corp.", "ticker": "INTC"},
        {"name": "Cisco Systems Inc.", "ticker": "CSCO"},
        {"name": "PepsiCo Inc.", "ticker": "PEP"},
        {"name": "Walmart Inc.", "ticker": "WMT"},
        {"name": "Chevron Corp.", "ticker": "CVX"},
        {"name": "AT&T Inc.", "ticker": "T"},
        {"name": "Merck & Co. Inc.", "ticker": "MRK"},
        {"name": "Verizon Communications Inc.", "ticker": "VZ"},
        {"name": "Nike Inc.", "ticker": "NKE"},
        {"name": "Boeing Co.", "ticker": "BA"},
        {"name": "Oracle Corp.", "ticker": "ORCL"},
        {"name": "Goldman Sachs Group Inc.", "ticker": "GS"},
        {"name": "McDonald's Corp.", "ticker": "MCD"},
        {"name": "3M Co.", "ticker": "MMM"},
        {"name": "Salesforce.com Inc.", "ticker": "CRM"},
        {"name": "Abbott Laboratories", "ticker": "ABT"},
        {"name": "American Express Co.", "ticker": "AXP"},
        {"name": "Costco Wholesale Corp.", "ticker": "COST"}
    ]
    const filteredStocks = stocks.filter((stock) =>
        stock.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const addStockToPortfolio = (stockName: string) => {
        if (!selectedStocks.includes(stockName)){
            setSelectedStocks([stockName, ...selectedStocks]);
        }
        setSearchValue('');
        if (stockSearchInputRef.current) {
            stockSearchInputRef.current.value = '';
        }
    }

    const updatePortfolio = (stockName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPortfolio(prevPortfolio => ({
            ...prevPortfolio,
            [stockName]: e.target.value
        }));
        console.log(portflio)
    }

    const handleCapitalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioCapital(e.target.value)
    }

    const handlePortfolioNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioName(e.target.value)
    }

    const handlePortfolioDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioDescription(e.target.value)
    }

    const handleSubmit = async () => {
        await portfolioName == '' ? setPortfolioNameError(true) : setPortfolioNameError(false)
        await portfolioDescription == '' ? setPortfolioDescriptionError(true) : setPortfolioDescriptionError(false)
        await portfolioCapital == '' ? setPortfolioCapitalError(true) : setPortfolioCapitalError(false)
        if (!(portfolioName == '' && portfolioDescription == '' && portfolioCapital == '')){
            console.log("Submitting portfolio")
        } else {
            console.log("Error")
        }
    }

    return (
        <>
            <NavBar />
            <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" style={{ marginTop: '20px' }}>Create a new portfolio</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="portfolioName"
                                    label="Portfolio Name"
                                    type="text"
                                    sx={{ width: '100%', marginTop: '20px' }}
                                    error={portfolioNameError}
                                    onChange={handlePortfolioNameChange}
                                />
                                {portfolioNameError && (
                                    <Typography variant="body2" color="error">
                                        Please enter a portfolio name.
                                    </Typography>
                                )}
                                <TextField
                                    id="portfolioDescription"
                                    label="Portfolio Description"
                                    multiline
                                    rows={4}
                                    type="text"
                                    sx={{ width: '100%', marginTop: '20px' }}
                                    onChange={handlePortfolioDescriptionChange}
                                    error={portfolioDescriptionError}
                                />
                                {portfolioDescriptionError && (
                                    <Typography variant="body2" color="error">
                                        Please enter a portfolio description.
                                    </Typography>
                                )}
                                <TextField
                                    id="portfolioCapital"
                                    label="Portfolio Capital"
                                    type="number"
                                    onChange={handleCapitalChange}
                                    sx={{ width: '100%', marginTop: '20px' }}
                                    error={portfolioCapitalError}
                                />
                                {portfolioCapitalError && (
                                    <Typography variant="body2" color="error">
                                        Please enter a portfolio capital.
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Box>
                            <TextField
                                id="stockSearch"
                                label="Search for stocks"
                                type="text"
                                sx={{ width: '100%', marginTop: '20px' }}
                                onChange={handleChange}
                                inputRef={stockSearchInputRef}
                            />
                            {searchValue && (
                                <Paper sx={{ width: '100%', margin: 'auto' }}>
                                    <MenuList>
                                        {filteredStocks.map((stock, idx) => (
                                            <MenuItem key={idx}>
                                                <ListItemText onClick={() => addStockToPortfolio(stock.name)}>{stock.name}</ListItemText>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            )}
                        </Box>
                        <Card sx={{marginTop: '20px', height: '200px', overflow: 'auto'}}>
                            <CardContent>
                                {selectedStocks.map((stock, idx) => (
                                    <MenuItem key={idx}>
                                        <Typography>{stock}</Typography>
                                        <TextField
                                            id="stockSearch"
                                            label="Enter Percentage of portfolio"
                                            type="number"
                                            sx={{ width: '100%', marginLeft: '20px' }}
                                            onChange={(e) => updatePortfolio(stock, e)}
                                        />
                                    </MenuItem>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={handleSubmit} style={{width: '100%', marginTop: '20px', backgroundColor: "#054be3", borderRadius: '10px'}}>Create portfolio</Button>
            </Box>
        </>
    );
};

export default CreatePortfolio;
