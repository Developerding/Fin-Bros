package g1t1.backend.portfolio;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

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
    

    public List<Portfolio> findAllPortfoliosByUserId(HashMap<String,String> userHash){
        return portfolioRepository.findByUserId(userHash.get("userId"));
    }

    public Portfolio findPortfolioByNameAndUserId(String name, HashMap<String,String> userHash){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userHash.get("userId"), name);
        return portfolio;
    }

    public ResponseEntity<String> findAndEditPortfolioByName(String name, Portfolio updatedPortfolio){
        String userId = updatedPortfolio.getUserId();
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userId, name);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            portfolio.setCapital(updatedPortfolio.getCapital());
            portfolio.setDateTime(updatedPortfolio.getDateTime());
            portfolio.setDescription(updatedPortfolio.getDescription());
            portfolio.setName(updatedPortfolio.getName());
            List<Allocation> allocations = updatedPortfolio.getAllocations();
            LocalDateTime inceptionDate = updatedPortfolio.getDateTime();
            int month = inceptionDate.getMonthValue();
            int year = inceptionDate.getYear();
            for (Allocation allocation : allocations){
                String allocationName = allocation.getStockName();
                Stock stock = stockService.findStockByName(allocationName);
                List<StockInstance> stockData = stock.getStockData();
                for (StockInstance stockInstance : stockData){
                    String dateTime = stockInstance.getDate();
                    String[] parts = dateTime.split("-");
                        Integer instanceYear = Integer.parseInt(parts[0]);
                        Integer instanceMonth = Integer.parseInt(parts[1]);
                        if (instanceYear.equals(year) && instanceMonth.equals(month)){
                            allocation.setAveragePrice(stockInstance.getClose());
                        }
                }
            }
            ArrayList<Allocation> arrayList = new ArrayList<>(allocations);
            portfolio.setAllocations(arrayList);
            portfolioRepository.save(portfolio);
            String responseMessage = "Portfolio updated successfully";
            return new ResponseEntity<>(responseMessage, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<String> findAndDeletePortfolioByName(String name, HashMap<String,String> userHash) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userHash.get("userId"), name);
        System.out.println(portfolio);
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
