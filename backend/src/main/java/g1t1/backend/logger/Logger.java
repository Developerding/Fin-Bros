package g1t1.backend.logger;

import org.springframework.stereotype.Controller;

@Controller
public class Logger {
    private static LoggerService loggerService;

    public Logger(LoggerService loggerService) {
        Logger.loggerService = loggerService;
    }

    public static void log(String message) {
        loggerService.createLog(new Log(message));
    }
}
