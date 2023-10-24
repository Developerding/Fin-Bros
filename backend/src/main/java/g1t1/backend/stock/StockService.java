package g1t1.backend.stock;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.crazzyghost.alphavantage.AlphaVantage;
import com.crazzyghost.alphavantage.timeseries.response.MetaData;
import com.crazzyghost.alphavantage.timeseries.response.StockUnit;
import com.crazzyghost.alphavantage.timeseries.response.TimeSeriesResponse;

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

        // Stock format to store in database
        // {
        //     "id": "...",
        //     "symbol": "IBM",
        //     "name": "IBM",
        //     "description": "...",
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

        String symbol = metaData.getSymbol();
        String name = metaData.getSymbol();
        String description = String.format("This is %s stock data", symbol);
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

        Stock stock = new Stock();
        stock.setSymbol(symbol);
        stock.setName(name);
        stock.setDescription(description);
        stock.setStockData(stockData);
        
        stockRepository.save(stock);
        return stock;
    }


    public Document calculateMovingAverage(String symbol, String startDate, String endDate) {

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

        return results;
    }

}
