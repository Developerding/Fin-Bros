package g1t1.backend.portfolio;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import g1t1.backend.allocation.Allocation;
import lombok.Data;

@Data
@Document
public class Portfolio {
    @Id
    private String id;
    private String userId;
    private double capital;
    private LocalDateTime dateTime;
    @Indexed(unique = true)
    private String name;
    private String description;
    private ArrayList<Allocation> allocations;
}
