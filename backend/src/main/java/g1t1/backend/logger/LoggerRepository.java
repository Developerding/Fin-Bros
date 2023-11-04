package g1t1.backend.logger;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LoggerRepository extends MongoRepository<Log, String> {
}
