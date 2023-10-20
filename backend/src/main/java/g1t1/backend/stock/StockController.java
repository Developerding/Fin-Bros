package g1t1.backend.stock;

import org.springframework.web.bind.annotation.RestController;

// import g1t1.backend.stock.StockRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

    // add data for a stock
    @GetMapping("/importstocks")
    public Stock importStocks(@RequestParam String symbolInput) {
        return stockService.importStocks(symbolInput);
    }

    // STILL DOING
    // get 1 year difference for stock
    // @GetMapping("/oneyeardifference")
    // public double getOneYearDifferenceStockPrice(@RequestParam String symbolInput) {
    //     return stockService.getOneYearDifferenceStockPrice(symbolInput);
    // }

}
