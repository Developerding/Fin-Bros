package g1t1.backend.stock;

public class TotalMovingAverageResult {
    
    private MovingAverageResult threeMonths;
    private MovingAverageResult sixMonths;
    private MovingAverageResult oneYear;
    private MovingAverageResult threeYears;
    private MovingAverageResult fiveYears;
    private MovingAverageResult tenYears;

    public TotalMovingAverageResult(MovingAverageResult threeMonths, MovingAverageResult sixMonths, MovingAverageResult oneYear, MovingAverageResult threeYears, MovingAverageResult fiveYears, MovingAverageResult tenYears) {
        this.threeMonths = threeMonths;
        this.sixMonths = sixMonths;
        this.oneYear = oneYear;
        this.threeYears = threeYears;
        this.fiveYears = fiveYears;
        this.tenYears = tenYears;
    }

    public MovingAverageResult getThreeMonths() {
        return this.threeMonths;
    }

    public void setThreeMonths(MovingAverageResult threeMonths) {
        this.threeMonths = threeMonths;
    }

    public MovingAverageResult getSixMonths() {
        return this.sixMonths;
    }

    public void setSixMonths(MovingAverageResult sixMonths) {
        this.sixMonths = sixMonths;
    }

    public MovingAverageResult getOneYear() {
        return this.oneYear;
    }

    public void setOneYear(MovingAverageResult oneYear) {
        this.oneYear = oneYear;
    }

    public MovingAverageResult getThreeYears() {
        return this.threeYears;
    }

    public void setThreeYears(MovingAverageResult threeYears) {
        this.threeYears = threeYears;
    }

    public MovingAverageResult getFiveYears() {
        return this.fiveYears;
    }

    public void setFiveYears(MovingAverageResult fiveYears) {
        this.fiveYears = fiveYears;
    }

    public MovingAverageResult getTenYears() {
        return this.tenYears;
    }

    public void setTenYears(MovingAverageResult tenYears) {
        this.tenYears = tenYears;
    }

    @Override
    public String toString() {
        return "{" +
            " threeMonths='" + getThreeMonths() + "'" +
            ", sixMonths='" + getSixMonths() + "'" +
            ", oneYear='" + getOneYear() + "'" +
            ", threeYears='" + getThreeYears() + "'" +
            ", fiveYears='" + getFiveYears() + "'" +
            ", tenYears='" + getTenYears() + "'" +
            "}";
    }
    

}
