package g1t1.backend.stock;

import java.time.LocalDate;

public class MovingAverageResult {
    
    private double avgOpen; 
    private double avgClose; 
    private double endDateClosePrice; 
    private LocalDate endDate;
    private double startDateClosePrice;
    private LocalDate startDate;
    private double difference;

    public MovingAverageResult(double avgOpen, double avgClose, double endDateClosePrice, LocalDate endDate, double startDateClosePrice, LocalDate startDate, double difference) {
        this.avgOpen = avgOpen;
        this.avgClose = avgClose;
        this.endDateClosePrice = endDateClosePrice;
        this.endDate = endDate;
        this.startDateClosePrice = startDateClosePrice;
        this.startDate = startDate;
        this.difference = difference;
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

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public double getStartDateClosePrice() {
        return this.startDateClosePrice;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public double getDifference() {
        return this.difference;
    }

}
