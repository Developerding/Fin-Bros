package g1t1.backend.allocation;

import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import g1t1.backend.portfolio.Portfolio;
import g1t1.backend.portfolio.PortfolioRepository;

@Service
public class AllocationService {
    private final PortfolioRepository portfolioRepository;

    public AllocationService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    // get all allocation of portfolio
    public ArrayList<Allocation> getAllocationsOfPortfolio(String portfolioName, String userIdCookie){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, portfolioName);
        if (portfolio == null){
            return new ArrayList<>();
        }
        return portfolio.getAllocations();
    }

    // edit allocation of portfolio
    public ResponseEntity<String> findPortfolioAndEditAllocation(String portfolioName, String userIdCookie, Allocation allocation){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, portfolioName);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        }
        ArrayList<Allocation> allocations = portfolio.getAllocations();
        for (int i = 0; i < allocations.size(); i++){
            Allocation existingAllocation = allocations.get(i);
            if (existingAllocation.getStockName().equals(allocation.getStockName())){
                allocations.set(i, allocation);
                portfolio.setAllocations(allocations);
                portfolioRepository.save(portfolio);
                String responseMessage = "Allocation updated successfully";
                return new ResponseEntity<String>(responseMessage, HttpStatus.ACCEPTED);
            }
        }
        String responseMessage = "Allocation does not exist in portfolio";
        return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
    }

    // delete allocation from portfolio
    public ResponseEntity<String> findPortfolioAndDeleteAllocation(String portfolioName, String userIdCookie, String allocationName){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, portfolioName);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            ArrayList<Allocation> allocations = portfolio.getAllocations();
            for (int i = 0; i < allocations.size(); i++){
                Allocation allocation = allocations.get(i);
                if (allocation.getStockName().equals(allocationName)){
                    allocations.remove(i);
                    portfolio.setAllocations(allocations);
                    portfolioRepository.save(portfolio);
                    String responseMessage = "Allocation deleted successfully";
                    return new ResponseEntity<String>(responseMessage, HttpStatus.ACCEPTED);
                }
            }
            String responseMessage = "Allocation does not exist in portfolio";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    // create allocation in portfolio
    public ResponseEntity<String> createAllocation(String portfolioName, String userIdCookie, Allocation allocation){
        Portfolio portfolio = portfolioRepository.findByUserIdAndName(userIdCookie, portfolioName);
        if (portfolio == null){
            String responseMessage = "Portfolio does not exist";
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        } else {
            ArrayList<Allocation> allocations = portfolio.getAllocations();
            if (allocations.isEmpty()) {
                allocations = new ArrayList<>();
                allocations.add(allocation);
                portfolio.setAllocations(allocations);
                portfolioRepository.save(portfolio);
                String responseMessage = "Allocation created successfully";
                return new ResponseEntity<String>(responseMessage, HttpStatus.ACCEPTED);
            }
            for (Allocation existingAllocation : allocations){
                if (existingAllocation.getStockName().equals(allocation.getStockName())){
                    String responseMessage = "Stock already exists in portfolio";
                    return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
                }
            }
            allocations.add(allocation);
            portfolio.setAllocations(allocations);
            portfolioRepository.save(portfolio);
            String responseMessage = "Allocation created successfully";
            return new ResponseEntity<String>(responseMessage, HttpStatus.ACCEPTED);
        }
    }

    // public List<Allocation> getAllAllocationById(int portfolioId) {
    //     Query query = new Query();
    //     query.addCriteria(Criteria.where("portfolioId").is(portfolioId));

    //     try {
    //          List<Allocation> allocations = mongoTemplate.find(query, Allocation.class);
    //          return allocations;
    //     }
    //     catch (Exception e) {
    //         e.printStackTrace();
    //         return Collections.emptyList();
    //     }
    // };

    // public List<Allocation> getSingleAllocation(int portfolioId, String stock) {
    //     Query query = new Query();
    //     query.addCriteria(
    //         new Criteria().andOperator(
    //             Criteria.where("portfolioId").is(portfolioId),
    //             Criteria.where("stock").is(stock)
    //         )
    //     );

    //     try {
    //          List<Allocation> allocation = mongoTemplate.find(query, Allocation.class);
    //          return allocation;
    //     }
    //     catch (Exception e) {
    //         e.printStackTrace();
    //         return Collections.emptyList();
    //     }
    // }

    // public Allocation createAllocation(Allocation newAllocation) {
    //     String stock = newAllocation.getStock();
    //     double price = newAllocation.getPrice();
    //     int quantity = newAllocation.getQuantity();
    //     int capitalAllocated = newAllocation.getCapitalAllocated();
    //     double percentage = newAllocation.getPercentage();
    //     int portfolioId = newAllocation.getPortfolioId();

    //     try {
    //          List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
             
    //          if (existingAllocation.isEmpty()) {
    //             Allocation allocation = allocationRepository.insert(new Allocation(stock, price, quantity, capitalAllocated, percentage, portfolioId));
    //             return allocation;
    //         }
    //     }
    //     catch (Exception e) {
    //         e.printStackTrace();
            
    //     }
    //     return null; 
    // }

    // public Allocation deleteAllocation(int portfolioId,String stock) {
    //     try {
    //          List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
             
    //          if (!existingAllocation.isEmpty()) {
    //             allocationRepository.delete(existingAllocation.get(0));
    //         }
    //     }
    //     catch (Exception e) {
    //         e.printStackTrace();
            
    //     }
    //     return null; 
    // }
    
    // public Allocation editAllocation(Allocation updatedAllocation) {
    //     int portfolioId = updatedAllocation.getPortfolioId();
    //     String stock = updatedAllocation.getStock();

    //     try {
    //         List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
    //         Allocation currentAllocation = existingAllocation.get(0);
    //         currentAllocation.setCapitalAllocated(updatedAllocation.getCapitalAllocated());
    //         currentAllocation.setPrice(updatedAllocation.getPrice());
    //         currentAllocation.setQuantity(updatedAllocation.getQuantity());
    //         currentAllocation.setPercentage(updatedAllocation.getPercentage());
    //         allocationRepository.save(currentAllocation);

    //         return currentAllocation;
    //     }
    //     catch (Exception e) {
    //         e.printStackTrace();
            
    //     }
    //     return null; 
    // }
}
