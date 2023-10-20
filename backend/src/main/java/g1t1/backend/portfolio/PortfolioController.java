package g1t1.backend.portfolio;

import java.util.List;
import java.util.HashMap;

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
    @GetMapping
    public List<Portfolio> findAllPortfolios(@RequestBody HashMap<String,String> userIdCookie){
        return portfolioService.findAllPortfoliosByUserId(userIdCookie);
    }

    // get portfolio by name
    @GetMapping("/{name}")
    public Portfolio findPortfolioByName(@PathVariable String name, @RequestBody HashMap<String,String> userIdCookie){
        return portfolioService.findPortfolioByNameAndUserId(name, userIdCookie);
    }

    @PutMapping("/edit/{name}")
    public ResponseEntity<String> findAndEditPortfolioByName(@PathVariable String name, @RequestBody Portfolio portfolio){
        return portfolioService.findAndEditPortfolioByName(name, portfolio);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> findAndDeletePortfolioByName(@PathVariable String name, @RequestBody HashMap<String,String> userIdCookie){
        return portfolioService.findAndDeletePortfolioByName(name, userIdCookie);
    }
}