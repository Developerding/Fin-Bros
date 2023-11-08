package g1t1.backend.portfolio;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PortfolioRepository extends MongoRepository<Portfolio, String> {
    Portfolio findByUserIdAndName(String userId, String name);
    ArrayList<Portfolio> findByUserId(String userId);
}

