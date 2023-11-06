package g1t1.backend.stock;

import java.util.ArrayList;
import java.util.List;

import java.time.*;
import java.time.format.DateTimeFormatter;

import org.json.JSONObject;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.crazzyghost.alphavantage.AlphaVantage;
import com.crazzyghost.alphavantage.fundamentaldata.response.CompanyOverview;
import com.crazzyghost.alphavantage.fundamentaldata.response.CompanyOverviewResponse;
import com.crazzyghost.alphavantage.timeseries.response.MetaData;
import com.crazzyghost.alphavantage.timeseries.response.StockUnit;
import com.crazzyghost.alphavantage.timeseries.response.TimeSeriesResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import g1t1.backend.stock.StockException.StockCannotImportException;

@Service
public class StockService {
    @Autowired
    private MongoTemplate mongoTemplate;
    private final StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }

    public List<Stock> findAllStocks(){
        return stockRepository.findAll();
    }

    public Stock findStockBySymbol(String symbol) {
        Stock stock = stockRepository.getStockBySymbol(symbol);
        return stock;
    }

    public Stock findStockByName(String name) {
        Stock stock = stockRepository.getStockByName(name);
        return stock;
    }

    // add data for a stock
    public Stock importStocks(String symbolInput) {

        // get all monthly stock prices data dating back 20+ years if available
        TimeSeriesResponse response = AlphaVantage.api()
            .timeSeries()
            .monthly()
            .forSymbol(symbolInput)
            .fetchSync();

        MetaData metaData = response.getMetaData();
        // MetaData format
        // {
        //     "information": "Monthly Prices (open, high, low, close) and Volumes",
        //     "symbol": "IBM",
        //     "lastRefreshed": "2023-10-13",
        //     "timeZone": null,
        //     "interval": null,
        //     "outputSize": null
        // }

        List<StockUnit> dataForAStockList = response.getStockUnits();
        // StockUnits format
        // [
        //     {
        //         "open": 140.04,
        //         "high": 143.415,
        //         "low": 138.27,
        //         "close": 138.46,
        //         "adjustedClose": 0.0,
        //         "volume": 32319252,
        //         "dividendAmount": 0.0,
        //         "splitCoefficient": 0.0,
        //         "date": "2023-10-13"
        //     },
        //     ...
        // ]

        // Error handling if stock with its symbol is not found from AlphaVantage API
        if (dataForAStockList.isEmpty()) {
            throw new StockCannotImportException("Cannot import this stock as its symbol is not found!");
        }

        String symbol = metaData.getSymbol();
        String name = metaData.getSymbol();
        List<StockInstance> stockData = new ArrayList<>();

        for (StockUnit dataForAStockItem : dataForAStockList) {

            double open = dataForAStockItem.getOpen();
            double high = dataForAStockItem.getHigh();
            double low = dataForAStockItem.getLow();
            double close = dataForAStockItem.getClose();
            double adjustedClose = dataForAStockItem.getAdjustedClose();
            long volume = dataForAStockItem.getVolume();
            double dividendAmount = dataForAStockItem.getDividendAmount();
            double splitCoefficient = dataForAStockItem.getSplitCoefficient();
            String dateTime = dataForAStockItem.getDate();

            StockInstance stockInstance = new StockInstance(open, high, low, close, adjustedClose, volume, dividendAmount, splitCoefficient, dateTime);

            stockData.add(stockInstance);

        }

        // after getting stock data, now get company data for the stock
        CompanyOverviewResponse companyOverviewResponse = AlphaVantage
            .api()
            .fundamentalData()
            .companyOverview()
            .forSymbol(symbolInput)
            .fetchSync();

        // companyOverviewResponse format
        // {
        //     "overview": {
        //         "description": "...",
        //         "country": "...",
        //         "exchange": "..."
        //     },
        //     "errorMessage": "..."
        // }

        CompanyOverview overview = companyOverviewResponse.getOverview();
        String description = "";
        String country = "";
        String exchange = "";
        String industry = "";
        String sector = "";
        String assetType = "";

        // means no company fundamental data
        if (overview != null) {
            description = overview.getDescription();
            country = overview.getCountry();
            exchange = overview.getExchange();
            industry = overview.getIndustry();
            sector = overview.getSector();
            assetType = overview.getAssetType();
        } 

        // String description = companyOverviewResponse.getOverview().getDescription();
        // String country = companyOverviewResponse.getOverview().getCountry();
        // String exchange = companyOverviewResponse.getOverview().getExchange();
        // String industry = companyOverviewResponse.getOverview().getIndustry();
        // String sector = companyOverviewResponse.getOverview().getSector();
        // String assetType = companyOverviewResponse.getOverview().getAssetType();

        // form an object of Stock
        // Stock format to store in database
        // {
        //     "id": "...",
        //     "symbol": "IBM",
        //     "name": "IBM",
        //     "description": "...",
        //     "country": "USA",
        //     "exchange": "NYSE",
        //     "industry": "COMPUTER & OFFICE EQUIPMENT",
        //     "sector": "TECHNOLOGY",
        //     "assetType": "Common Stock",
        //     [
        //         {
        //             "open": 140.04,
        //             "high": 143.415,
        //             "low": 138.27,
        //             "close": 138.46,
        //             "adjustedClose": 0.0,
        //             "volume": 32319252,
        //             "dividendAmount": 0.0,
        //             "splitCoefficient": 0.0,
        //             "dateTime": "2023-10-13"
        //         },
        //         ...
        //     ]
        // }

        Stock stock = new Stock();
        stock.setSymbol(symbol);
        stock.setName(name);
        stock.setDescription(description);
        stock.setCountry(country);
        stock.setExchange(exchange);
        stock.setIndustry(industry);
        stock.setSector(sector);
        stock.setAssetType(assetType);
        stock.setStockData(stockData);
        
        // save this Stock object into db
        stockRepository.save(stock);
        return stock;
    }


    public MovingAverageResult calculateMovingAverage(String symbol, String startDate, String endDate) {

        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("symbol").is(symbol)),
            Aggregation.unwind("stockData"),
            Aggregation.match(
                Criteria.where("stockData.dateTime")
                        .gte(startDate)
                        .lte(endDate)
            ),
            Aggregation.group()
                .avg("stockData.open").as("avgOpen")
                .avg("stockData.close").as("avgClose")
                .first("stockData.close").as("endDateClosePrice")
                .first("stockData.dateTime").as("endDate")
                .last("stockData.close").as("startDateClosePrice")
                .last("stockData.dateTime").as("startDate")
                .last("symbol").as("symbol"),
            Aggregation.project()
                .and("symbol").as("symbol")
                .and("avgOpen").as("avgOpen")
                .and("avgClose").as("avgClose")
                .and("endDateClosePrice").as("endDateClosePrice")
                .and("endDate").as("endDate")
                .and("startDateClosePrice").as("startDateClosePrice")
                .and("startDate").as("startDate")
                .andExpression("endDateClosePrice - startDateClosePrice").as("difference")
        );

        Document results = mongoTemplate.aggregate(aggregation, "stock", MovingAverageResult.class).getRawResults();

        // Document format
        // {
        //     "results": [
        //         {
        //             "_id": null,
        //             "avgOpen": 136.62666666666667,
        //             "avgClose": 138.69500000000002,
        //             "endDateClosePrice": 138.46,
        //             "endDate": "2023-10-13",
        //             "startDateClosePrice": 128.59,
        //             "startDate": "2023-05-31",
        //             "symbol": "IBM",
        //             "difference": 9.870000000000005
        //         }
        //     ],
        //     "ok": 1.0
        // }

        // trying to break down the Document object and return it as MovingAverageResult class
        try {
            JSONObject jsonObject = new JSONObject(results);
            JSONObject resultJsonObject = jsonObject.getJSONArray("results").getJSONObject(0);
            
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.findAndRegisterModules();
            
            MovingAverageResult movingAverageResult;
            try {
                movingAverageResult = objectMapper.readValue(resultJsonObject.toString(), MovingAverageResult.class);
                return movingAverageResult;

            } catch (JsonMappingException e) {
                e.printStackTrace();
                return null;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            } 
        } catch (org.json.JSONException e) {
            e.printStackTrace();
            return null;
        }
    }


    public TotalMovingAverageResult getTotalMovingAverageResult(String symbol, String currentDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Parse the string into a LocalDate
        LocalDate date = LocalDate.parse(currentDate);

        // Subtract 3 months
        LocalDate subtract3MonthsDate = date.minusMonths(3);
        String subtract3MonthsDateStr = subtract3MonthsDate.format(formatter);

        // past 3 months
        MovingAverageResult get3MonthsMovingAverageResult = calculateMovingAverage(symbol, subtract3MonthsDateStr, currentDate);

        // subtract 6 months
        LocalDate subtract6MonthsDate = date.minusMonths(6);
        String subtract6MonthsDateStr = subtract6MonthsDate.format(formatter);

        // past 6 months
        MovingAverageResult get6MonthsMovingAverageResult = calculateMovingAverage(symbol, subtract6MonthsDateStr, currentDate);

        // subtract 1 year
        LocalDate subtract1YearDate = date.minusYears(1);
        String subtract1YearDateStr = subtract1YearDate.format(formatter);

        // past 1 year
        MovingAverageResult get1YearMovingAverageResult = calculateMovingAverage(symbol, subtract1YearDateStr, currentDate);

        // subtract 3 years
        LocalDate subtract3YearsDate = date.minusYears(3);
        String subtract3YearsDateStr = subtract3YearsDate.format(formatter);

        // past 3 years
        MovingAverageResult get3YearsMovingAverageResult = calculateMovingAverage(symbol, subtract3YearsDateStr, currentDate);

        // subtract 5 years
        LocalDate subtract5YearsDate = date.minusYears(5);
        String subtract5YearsDateStr = subtract5YearsDate.format(formatter);

        // past 5 years
        MovingAverageResult get5YearsMovingAverageResult = calculateMovingAverage(symbol, subtract5YearsDateStr, currentDate);

        // subtract 10 years
        LocalDate subtract10YearsDate = date.minusYears(10);
        String subtract10YearsDateStr = subtract10YearsDate.format(formatter);

        // past 10 years
        MovingAverageResult get10YearsMovingAverageResult = calculateMovingAverage(symbol, subtract10YearsDateStr, currentDate);


        TotalMovingAverageResult totalMovingAverageResult = new TotalMovingAverageResult(get3MonthsMovingAverageResult, get6MonthsMovingAverageResult, get1YearMovingAverageResult, get3YearsMovingAverageResult, get5YearsMovingAverageResult, get10YearsMovingAverageResult);

        // Format of TotalMovingAverageResult
        // {
        //     "3months": {
        //         "symbol": "MSFT",
        //         "avgOpen": 79.74181352313167,
        //         "avgClose": 80.47611992882563,
        //         "endDateClosePrice": 315.75,
        //         "endDate": "2023-09-29",
        //         "startDateClosePrice": 62.56,
        //         "startDate": "2000-05-31",
        //         "difference": 253.19
        //     },
        //     "6months": {
        //         "symbol": "MSFT",
        //         "avgOpen": 79.74181352313167,
        //         "avgClose": 80.47611992882563,
        //         "endDateClosePrice": 315.75,
        //         "endDate": "2023-09-29",
        //         "startDateClosePrice": 62.56,
        //         "startDate": "2000-05-31",
        //         "difference": 253.19
        //     },
        //     ...
        // }

        return totalMovingAverageResult;

    }

    public List<StockInstance> getpricesbetween2dates(String symbol, String startDate, String endDate) {

        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("symbol").is(symbol)),
            Aggregation.unwind("stockData"),
            Aggregation.match(
                Criteria.where("stockData.dateTime")
                    .gte(startDate)
                    .lte(endDate)
            ),
            Aggregation.project()
                .and("stockData.open").as("open")
                .and("stockData.high").as("high")
                .and("stockData.low").as("low")
                .and("stockData.close").as("close")
                .and("stockData.adjustedClose").as("adjustedClose")
                .and("stockData.volume").as("volume")
                .and("stockData.dividendAmount").as("dividendAmount")
                .and("stockData.splitCoefficient").as("splitCoefficient")
                .and("stockData.dateTime").as("dateTime")
        );

        AggregationResults<StockInstance> results = mongoTemplate.aggregate(aggregation, "stock", StockInstance.class);

        return results.getMappedResults();

    }

}
