package g1t1.backend.allocation;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Allocation{
    @Indexed(unique = true)
    private String stockName;
    private double averagePrice;
    private double quantity;
    private double capitalAllocated;
    private double percentage;
}