package g1t1.backend.portfolio;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository){
        this.portfolioRepository = portfolioRepository;
    }

    public ResponseEntity<String> createPortfolio(Portfolio portfolio){
        // Check if a portfolio with the same name already exists for the given user
        Portfolio retrievedPortfolio = portfolioRepository.findByUserIdAndName(portfolio.getUserId(), portfolio.getName());
        if (retrievedPortfolio != null) {
            String responseMessage = "A portfolio with this name already exists for this user.";
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            // Portfolio name is unique, so we can proceed to create it
            portfolioRepository.save(portfolio);
            String responseMessage = "Portfolio created successfully";
            return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
        }
    }
    

    public List<Portfolio> findAllPortfoliosByUserId(String userIdCookie){
        return portfolioRepository.findByUserId(userIdCookie);
    }

    public Portfolio findPortfolioByNameAndUserId(String name, String userIdCookie){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, name);
        return portfolio;
    }

    public ResponseEntity<String> findAndEditPortfolioByName(String name, String userIdCookie, Portfolio updatedPortfolio){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, name);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            portfolio.setCapital(updatedPortfolio.getCapital());
            portfolio.setDateTime(updatedPortfolio.getDateTime());
            portfolio.setDescription(updatedPortfolio.getDescription());
            portfolioRepository.save(portfolio);
            String responseMessage = "Portfolio updated successfully";
            return new ResponseEntity<>(responseMessage, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<String> findAndDeletePortfolioByName(String name, String userIdCookie) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, name);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            portfolioRepository.delete(portfolio);
            String responseMessage = "Portfolio deleted successfully";
            return new ResponseEntity<String>(responseMessage, HttpStatus.ACCEPTED);
        }
    }
}
