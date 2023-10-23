package g1t1.backend.portfolio;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import g1t1.backend.allocation.Allocation;
import g1t1.backend.stock.Stock;
import g1t1.backend.stock.StockInstance;
import g1t1.backend.stock.StockService;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final StockService stockService;

    public PortfolioService(PortfolioRepository portfolioRepository, StockService stockService){
        this.portfolioRepository = portfolioRepository;
        this.stockService = stockService;
    }

    public ResponseEntity<String> createPortfolio(Portfolio portfolio){
        // Check if a portfolio with the same name already exists for the given user
        Portfolio retrievedPortfolio = portfolioRepository.findByUserIdAndName(portfolio.getUserId(), portfolio.getName());
        if (retrievedPortfolio != null) {
            String responseMessage = "A portfolio with this name already exists for this user.";
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            // Portfolio name is unique, so we can proceed to create it
            List<Allocation> allocations = portfolio.getAllocations();
            LocalDateTime inceptionDate = portfolio.getDateTime();
            int month = inceptionDate.getMonthValue();
            int year = inceptionDate.getYear();
            for (Allocation allocation : allocations){
                String allocationName = allocation.getStockName();
                Stock stock = stockService.findStockByName(allocationName);
                List<StockInstance> stockData = stock.getStockData();
                for (StockInstance stockInstance : stockData){
                    String dateTime = stockInstance.getDate();
                    String[] dateArr = dateTime.split("-");
                    int stockYear = Integer.parseInt(dateArr[0]);
                    int stockMonth = Integer.parseInt(dateArr[1]);
                    if (month == stockMonth && year == stockYear){
                        double close = stockInstance.getClose();
                        allocation.setAveragePrice(close);
                    }
                }
            }
            portfolioRepository.save(portfolio);
            String responseMessage = "Portfolio created successfully";
            return new ResponseEntity<String>(responseMessage, HttpStatus.CREATED);
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
