import { Typography, TextField, Grid, Box, MenuList, MenuItem, Paper, ListItemText, Card, CardContent, Button, Alert } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useStores } from "../stores";

export const CreatePortfolio = () => {
    const AppStore = useStores();
    const [portfolioName, setPortfolioName] = useState('');
    const [portfolioNameError, setPortfolioNameError] = useState(false);
    const [portfolioDescription, setPortfolioDescription] = useState('');
    const [portfolioDescriptionError, setPortfolioDescriptionError] = useState(false)
    const [portfolioCapital, setPortfolioCapital] = useState(0);
    const [portfolioCapitalError, setPortfolioCapitalError] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
    const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({});
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');
    const [portfolioDate, setPortfolioDate] = useState('');
    const [portfolioDateError, setPortfolioDateError] = useState(false);
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
    const Appstore = useStores();

    const filteredStocks = stocks.filter((stock) =>
        stock.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const addStockToPortfolio = (stockName: string) => {
        if (!selectedStocks.includes(stockName)){
            setSelectedStocks([...selectedStocks, stockName]);
        }
        setSearchValue('');
        if (stockSearchInputRef.current) {
            stockSearchInputRef.current.value = '';
        }
    }

    const updatePortfolio = (stockName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPortfolio(prevPortfolio => ({
            ...prevPortfolio,
            [stockName]: Number.parseInt(e.target.value)
        }));
    }

    const removeStock = (stockName: string) => {
        setSelectedStocks(prevPortfolio => prevPortfolio.filter(stock => stock != stockName)),
        setPortfolio(prevPortfolio => {
            const {[stockName]: omittedKey, ...newPortfolio} = prevPortfolio
            return newPortfolio;
        })
    }

    const handleCapitalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioCapital(Number.parseInt(e.target.value))
    }

    const handlePortfolioNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioName(e.target.value)
    }

    const handlePortfolioDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioDescription(e.target.value)
    }

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPortfolioDate(e.target.value)
    }

    const handleSubmit = async () => {
        await portfolioName == '' ? setPortfolioNameError(true) : setPortfolioNameError(false)
        await portfolioDescription == '' ? setPortfolioDescriptionError(true) : setPortfolioDescriptionError(false)
        await portfolioCapital == 0 ? setPortfolioCapitalError(true) : setPortfolioCapitalError(false)
        await portfolioDate == '' ? setPortfolioDateError(true) : setPortfolioDateError(false)
        if (portfolioName == '' || portfolioDescription == '' || portfolioCapital == 0 || selectedStocks.length == 0 || portfolioDate.length == 0){
            setErrorText("Please fill up missing information below")
            setTimeout(() => {
                setErrorText("")
            }, 3000);
        } else {
            setErrorText("")
            let sum = 0;
            for (const key in portfolio) {
                sum += portfolio[key];
            }
            if (sum > 100){
                setErrorText("Portfolio allocation exceeds 100%")
                setTimeout(() => {
                    setErrorText("")
                }, 3000);
            } else if (sum != 100){
                setErrorText("Portfolio allocation does not add up to 100%")
                setTimeout(() => {
                    setErrorText("")
                }, 3000);
            } else {
                let parts = portfolioDate.split('-');
                let year = parseInt(parts[0], 10);
                let month = parseInt(parts[1], 10) - 1;
                let day = parseInt(parts[2], 10);
                let date = new Date(year,month,day);
                let currentDate = new Date()
                if (date > currentDate){
                    setErrorText("Please input an inception date before today")
                    setTimeout(() => {
                        setErrorText("")
                    }, 3000);
                } else {
                    let data = {
                        userId: 2,
                        capital: portfolioCapital,
                        dateTime: date,
                        name: portfolioName,
                        description: portfolioDescription,
                        allocations: [] as { [key: string] : any }[]
                    }
                    for (const key in portfolio){
                        let stockDict : { [key: string]: any } = {}
                        stockDict['stockName'] = key;
                        stockDict['percentage'] = portfolio[key];
                        data.allocations.push(stockDict)
                    }
                    AppStore.uploadPortfolioController(data)
                    .then((res: any) => {
                        if (res.status == 201){
                            setSuccessText(res.data)
                            setPortfolioName("")
                            setPortfolioDescription("")
                            setPortfolioDescription("")
                            setPortfolio({});
                            setSelectedStocks([]);
                            setPortfolioDate("");
                            setPortfolioCapital(0);
                            setTimeout(() => {
                                setSuccessText("")
                            }, 3000);
                            console.log(res);
                        } else {
                            setErrorText(res.response.data)
                            setTimeout(() => {
                                setErrorText("")
                            }, 3000);
                        }
                    })
                }
            }
        }
    }

    return (
        <>
            <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" style={{ marginTop: '20px' }}>Create a new portfolio</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography style={{ marginTop: '20px' }}>Portfolio Inception Date</Typography>
                        <TextField
                            type="date"
                            value={portfolioDate}
                            onChange={handleDateChange}
                            error={portfolioDateError}
                        />
                    </Grid>
                </Grid>
                {errorText.length > 0 && (
                    <Alert severity="error" style={{marginTop: '20px'}}>{errorText}</Alert>
                )}
                {successText.length > 0 && (
                    <Alert severity="success" style={{marginTop: '20px'}}>{successText}</Alert>
                )}
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
                                    value={portfolioName}
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
                                    rows={8}
                                    type="text"
                                    value={portfolioDescription}
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
                                    value={portfolioCapital}
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
                                                <ListItemText onClick={() => addStockToPortfolio(stock.ticker)}>{stock.name}</ListItemText>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            )}
                        </Box>
                        <Card sx={{marginTop: '20px', height: '290px', overflow: 'auto'}}>
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
                                        <Button onClick={() => removeStock(stock)}>
                                            -
                                        </Button>
                                    </MenuItem>
                                ))}
                                {selectedStocks.length === 0 && (
                                    <Typography variant="body2" color="error">
                                        No stocks have been added to the portfolio.
                                    </Typography>
                                )}
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
