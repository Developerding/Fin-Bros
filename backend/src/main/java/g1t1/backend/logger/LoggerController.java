package g1t1.backend.logger;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import g1t1.backend.stock.Stock;

@RestController
@RequestMapping("/api/log")
@CrossOrigin(origins="https://fin-bros.vercel.app/")
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

    //get all logs
    @GetMapping
    public List<Log> getAllLogs(){
        return loggerService.getLogs();
    }
}