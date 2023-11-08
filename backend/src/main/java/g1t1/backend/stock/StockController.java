package g1t1.backend.stock;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "https://fin-bros.vercel.app/")
@RequestMapping("/api/stock")
public class StockController {
    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<Stock> findAllStocks() {
        return stockService.findAllStocks();
    }

    @GetMapping("/findstockbyname")
    public Stock findStockByName(@RequestParam String name) {
        return stockService.findStockByName(name);
    }

    @GetMapping("/findstockbysymbol")
    public Stock findStockBySymbol(@RequestParam String symbol) {
        return stockService.findStockBySymbol(symbol);
    }

    // add data for a stock
    @GetMapping("/importstocks")
    public Stock importStocks(@RequestParam String symbolInput) {
        return stockService.importStocks(symbolInput);
    }

    // get analytics of a stock between 2 dates
    @RequestMapping(
        value = "/getmovingaverage", 
        method = RequestMethod.GET, 
        produces = "application/json"
        )
    public MovingAverageResult calculateMovingAverage(
            @RequestParam String symbol,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return stockService.calculateMovingAverage(symbol, startDate, endDate);
    }

    // get 3 months, 6 months, 1 year, 3 years, 5 years and 10 years analytics of a
    // stock
    @RequestMapping("/gettotalmovingaverage")
    public TotalMovingAverageResult getTotalMovingAverageResult(
            @RequestParam String symbol,
            @RequestParam String currentDate) {
        return stockService.getTotalMovingAverageResult(symbol, currentDate);
    }

    // get stock prices between 2 dates
    @GetMapping("/getpricesbetween2dates")
    public List<StockInstance> getpricesbetween2dates(
        @RequestParam String symbol,
        @RequestParam String startDate, 
        @RequestParam String endDate
        ) {
        return stockService.getpricesbetween2dates(symbol, startDate, endDate);
    }

}
