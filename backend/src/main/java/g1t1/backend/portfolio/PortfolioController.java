package g1t1.backend.portfolio;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins="http://localhost:5173")
public class PortfolioController {
    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService){
        this.portfolioService = portfolioService;
    }

    // create portfolio
    @PostMapping
    public ResponseEntity<String> createPortfolio(@RequestBody Portfolio portfolio){
        return portfolioService.createPortfolio(portfolio);
    }

    // get all portfolios
    @GetMapping("/{userId}")
    public List<Portfolio> findAllPortfolios(@PathVariable String userId){
        return portfolioService.findAllPortfoliosByUserId(userId);
    }

    // get portfolio by name
    // @GetMapping("/{name}")
    // public void findPortfolioByName(@PathVariable String name, @CookieValue("USERID") String userIdCookie){
    //     // return portfolioService.findPortfolioByNameAndUserId(name, userData);
    //     System.out.println(name);
    //     System.out.println(userIdCookie);
    // }

    // @PutMapping("/edit/{name}")
    // public ResponseEntity<String> findAndEditPortfolioByName(@PathVariable String name, @RequestBody Portfolio portfolio){
    //     return portfolioService.findAndEditPortfolioByName(name, portfolio);
    // }

    // @DeleteMapping("/{name}")
    // public ResponseEntity<String> findAndDeletePortfolioByName(@PathVariable String name){
    //     return portfolioService.findAndDeletePortfolioByName(name);
    // }
}