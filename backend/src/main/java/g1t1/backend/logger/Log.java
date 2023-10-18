package g1t1.backend.logger;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Log {
    @Id
    private String id;
    private String message;

    public Log(String message) {
        this.message = message;
    }
}