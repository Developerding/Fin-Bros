package g1t1.backend.portfolio;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Portfolio {
    @Id
    private String id;
    private int capital;
    private LocalDateTime dateTime;
    @Indexed(unique = true)
    private String name;
    private String description;
}