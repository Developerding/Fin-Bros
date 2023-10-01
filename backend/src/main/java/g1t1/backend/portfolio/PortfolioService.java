package g1t1.backend.portfolio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository){
        this.portfolioRepository = portfolioRepository;
    }

    public Portfolio createPortfolio(Portfolio portfolio){
        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> findAllPortfolios(){
        return portfolioRepository.findAll();
    }

    public Portfolio findPortfolioByName(String name){
        List<Portfolio> portfolios = portfolioRepository.findAll();
        for(Portfolio portfolio : portfolios){
            if(portfolio.getName().equals(name)){
                return portfolio;
            }
        }
        return null;
    }

    public Portfolio findAndEditPortfolioByName(String name, Portfolio updatedPortfolio){
        List<Portfolio> portfolios = portfolioRepository.findAll();
        for (Portfolio portfolio : portfolios) {
            if (portfolio.getName().equals(name)) {
                portfolio.setCapital(updatedPortfolio.getCapital());
                portfolio.setDateTime(updatedPortfolio.getDateTime());
                portfolio.setDescription(updatedPortfolio.getDescription());
                portfolioRepository.save(portfolio);
                return portfolio;
            }
        }
        return null;
    }

    public String findAndDeletePortfolioByName(String name) {
        List<Portfolio> portfolios = portfolioRepository.findAll();
        for (Portfolio portfolio : portfolios) {
            if (portfolio.getName().equals(name)) {
                portfolioRepository.delete(portfolio);
                return "Portfolio deleted successfully";
            }
        }
        return null;
    }
}
