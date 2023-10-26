package g1t1.backend.logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/log")
@CrossOrigin(origins="http://localhost:5173")
public class LoggerController {
    private final LoggerService loggerService;

    public LoggerController(LoggerService loggerService){
        this.loggerService = loggerService;
    }

    // create log
    @PostMapping
    public ResponseEntity<String> createPortfolio(@RequestBody Log log){
        return loggerService.createLog(log);
    }
}