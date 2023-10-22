package g1t1.backend.stock;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/stock")
public class StockController {
    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService){
        this.stockService = stockService;
    }

    @GetMapping
    public List<Stock> findAllStocks(){
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

    // @RequestMapping("/getmovingaverage")
    @RequestMapping(
        value = "/getmovingaverage", 
        method = RequestMethod.GET, 
        produces = "application/json"
        )
    public Document calculateMovingAverage(
        @RequestParam String symbol,
        @RequestParam String startDate, 
        @RequestParam String endDate
        ) {
        return stockService.calculateMovingAverage(symbol, startDate, endDate);
    }

}
