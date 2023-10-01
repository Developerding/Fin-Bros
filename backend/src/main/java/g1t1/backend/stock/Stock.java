package g1t1.backend.stock;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Stock {
    @Id
    private String id;
    private String symbol;
    private String name;
    private String description;
}
