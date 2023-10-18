package g1t1.backend.logger;

import org.springframework.stereotype.Service;

@Service
public class LoggerService {
    private final LoggerRepository loggerRepository;

    public LoggerService(LoggerRepository loggerRepository) {
        this.loggerRepository = loggerRepository;
    }

    public void createLog(Log log) {
        loggerRepository.save(log);
    }
}
