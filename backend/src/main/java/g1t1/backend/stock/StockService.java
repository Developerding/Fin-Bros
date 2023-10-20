package g1t1.backend.stock;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crazzyghost.alphavantage.AlphaVantage;
import com.crazzyghost.alphavantage.timeseries.response.MetaData;
import com.crazzyghost.alphavantage.timeseries.response.StockUnit;
import com.crazzyghost.alphavantage.timeseries.response.TimeSeriesResponse;

@Service
public class StockService {
    private final StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }

    public List<Stock> findAllStocks(){
        return stockRepository.findAll();
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

    // STILL DOING
    // get one year difference in stock price for a stock
    // public double getOneYearDifferenceStockPrice(String symbolInput) {

    // }

}
