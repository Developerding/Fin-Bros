package g1t1.backend.portfolio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService){
        this.portfolioService = portfolioService;
    }

    // create portfolio
    @PostMapping
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio){
        return portfolioService.createPortfolio(portfolio);
    }

    // get all portfolios
    @GetMapping
    public List<Portfolio> findAllPortfolios(){
        return portfolioService.findAllPortfolios();
    }

    // get portfolio by name
    @GetMapping("/{name}")
    public Portfolio findPortfolioByName(@PathVariable String name){
        return portfolioService.findPortfolioByName(name);
    }

    @PutMapping("/edit/{name}")
    public Portfolio findAndEditPortfolioByName(@PathVariable String name, @RequestBody Portfolio portfolio){
        return portfolioService.findAndEditPortfolioByName(name, portfolio);
    }

    @DeleteMapping("/{name}")
    public String findAndDeletePortfolioByName(@PathVariable String name){
        return portfolioService.findAndDeletePortfolioByName(name);
    }
}