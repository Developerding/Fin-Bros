package g1t1.backend.stock;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document("stock")
public class Stock {
    @Id
    private String id;
    private String symbol;
    private String name;
    private String description;
    private String country;
    private String exchange;
    private String industry;
    private String sector;
    private String assetType;
    private List<StockInstance> stockData;

}
