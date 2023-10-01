package g1t1.backend.stock;

import org.springframework.web.bind.annotation.RestController;

import g1t1.backend.stock.StockRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@Service
@RestController
@RequestMapping("/api/stock")
public class StockController {
    private final StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }

    @GetMapping
    public List<Stock> findAllStocks(){
        return stockRepository.findAll();
    }
}
