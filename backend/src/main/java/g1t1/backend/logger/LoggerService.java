package g1t1.backend.logger;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {
    private final LoggerRepository loggerRepository;

    public LoggerService(LoggerRepository loggerRepository) {
        this.loggerRepository = loggerRepository;
    }

    public ResponseEntity<String> createLog(Log log) {
        loggerRepository.save(log);
        String responseMessage = "Log created successfully";
        return new ResponseEntity<String>(responseMessage, HttpStatus.CREATED);
    }

    public List<Log> getLogs(){
        return loggerRepository.findAll();
    }
}
