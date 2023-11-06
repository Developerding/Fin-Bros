package g1t1.backend.stock;

import java.util.*;

public class AggregationResults {
    
    private List<StockInstance> movingAverageResultList;

    public AggregationResults(List<StockInstance> movingAverageResultList) {
        this.movingAverageResultList = movingAverageResultList;
    }

    public List<StockInstance> getMovingAverageResultList() {
        return this.movingAverageResultList;
    }

}
