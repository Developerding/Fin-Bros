package g1t1.backend.stock;

import java.time.LocalDate;

public class MovingAverageResult {
    
    private String symbol;
    private double avgOpen; 
    private double avgClose; 
    private double endDateClosePrice; 
    private String endDate;
    private double startDateClosePrice;
    private String startDate;
    private double difference;

    public MovingAverageResult() {}

    public MovingAverageResult(String symbol, double avgOpen, double avgClose, double endDateClosePrice, String endDate, double startDateClosePrice, String startDate, double difference) {
        this.symbol = symbol;
        this.avgOpen = avgOpen;
        this.avgClose = avgClose;
        this.endDateClosePrice = endDateClosePrice;
        this.endDate = endDate;
        this.startDateClosePrice = startDateClosePrice;
        this.startDate = startDate;
        this.difference = difference;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getAvgClose() {
        return avgClose;
    }

    public double getAvgOpen() {
        return avgOpen;
    }

    public double getEndDateClosePrice() {
        return this.endDateClosePrice;
    }

    public String getEndDate() {
        return this.endDate;
    }

    public double getStartDateClosePrice() {
        return this.startDateClosePrice;
    }

    public String getStartDate() {
        return this.startDate;
    }

    public double getDifference() {
        return this.difference;
    }

}
