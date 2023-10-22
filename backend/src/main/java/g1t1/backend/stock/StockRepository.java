package g1t1.backend.stock;

import org.springframework.data.mongodb.repository.MongoRepository;
public interface StockRepository extends MongoRepository<Stock, String> {
    
    public Stock getStockByName(String name);
    public Stock getStockBySymbol(String symbol);

}
