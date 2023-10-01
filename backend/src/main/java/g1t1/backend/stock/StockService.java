package g1t1.backend.stock;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1t1.backend.portfolio.Portfolio;

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

    public Stock findStockByName(String name){
        List<Stock> stocks = stockRepository.findAll();
        for(Stock stock : stocks){
            if(stock.getName().equals(name)){
                return stock;
            }
        }
        return null;
    }
}
