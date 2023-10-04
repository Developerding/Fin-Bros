package g1t1.backend.allocation;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/allocation")
public class AllocationController {
    private AllocationService allocationService;

    public AllocationController(AllocationService allocationService){
        this.allocationService = allocationService;
    }

    // Get all allocations of a single portfolio
    @GetMapping("/{portfolioName}")
    public ArrayList<Allocation> getAllocationsOfPortfolio(@CookieValue("USERID") String userIdCookie, @PathVariable String portfolioName){
        return this.allocationService.getAllocationsOfPortfolio(portfolioName, userIdCookie);
    }

    // // Get a single allocation of a single portfolio
    // @GetMapping("/{portfolioId}/{stock}")
    // public ResponseEntity<List<Allocation>> getSingleAllocation(@PathVariable int portfolioId,@PathVariable String stock) {
    //     return new ResponseEntity<List<Allocation>>(allocationService.getSingleAllocation(portfolioId, stock),HttpStatus.OK);
    // }

    // Create a new allocation for specific portfolio 
    @PostMapping("/create/{portfolioName}")
    public ResponseEntity<String> createAllocation(@CookieValue("USERID") String userIdCookie, @PathVariable String portfolioName, @RequestBody Allocation allocation) {
        return this.allocationService.createAllocation(portfolioName, userIdCookie, allocation);
    }

    // Edit an exiting allocation
    @PutMapping("/edit/{portfolioName}")
    public ResponseEntity<String> editAllocation(@CookieValue("USERID") String userIdCookie, @PathVariable String portfolioName, @RequestBody Allocation allocation){
        return this.allocationService.findPortfolioAndEditAllocation(portfolioName, userIdCookie, allocation);
    }

    // Delete an existing allocation
    @DeleteMapping("/{portfolioName}/{allocationName}")
    public ResponseEntity<String> deleteAllocation(@CookieValue("USERID") String userIdCookie, @PathVariable String portfolioName, @PathVariable String allocationName){
        return this.allocationService.findPortfolioAndDeleteAllocation(portfolioName, userIdCookie, allocationName);
    }

    // @PutMapping("delete/{portfoilioId}/{stock}")
    // public ResponseEntity<> deleteAllocation(){
    //     return new ResponseEntity(allocationService.deleteAllocation()
    // }
}
