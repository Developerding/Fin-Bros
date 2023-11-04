package g1t1.backend.allocation;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Allocation{
    private String stockName;
    private double averagePrice;
    private double percentage;
}