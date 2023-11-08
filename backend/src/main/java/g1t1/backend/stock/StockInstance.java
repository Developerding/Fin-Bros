package g1t1.backend.stock;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class StockInstance implements Serializable {
   private double open;
   private double high;
   private double low;
   private double close;
   private double adjustedClose;
   private long volume;
   private double dividendAmount;
   private double splitCoefficient;

   private String dateTime;

   public StockInstance(double open, double high, double low, double close, double adjustedClose, long volume, double dividendAmount, double splitCoefficient, String dateTime) {
      this.open = open;
      this.high = high;
      this.low = low;
      this.close = close;
      this.adjustedClose = adjustedClose;
      this.volume = volume;
      this.dividendAmount = dividendAmount;
      this.splitCoefficient = splitCoefficient;
      this.dateTime = dateTime;
   }

   public double getOpen() {
      return this.open;
   }

   public double getHigh() {
      return this.high;
   }

   public double getLow() {
      return this.low;
   }

   public double getClose() {
      return this.close;
   }

   public double getAdjustedClose() {
      return this.adjustedClose;
   }

   public long getVolume() {
      return this.volume;
   }

   public double getDividendAmount() {
      return this.dividendAmount;
   }

   public double getSplitCoefficient() {
      return this.splitCoefficient;
   }

   public String getDate() {
      return this.dateTime;
   }

   public String toString() {
      return "\nStockUnit{open=" + this.open + ", high=" + this.high + ", low=" + this.low + ", close=" + this.close + ", adjustedClose=" + this.adjustedClose + ", volume=" + this.volume + ", dividendAmount=" + this.dividendAmount + ", splitCoefficient=" + this.splitCoefficient + ", date=" + this.dateTime + '}';
   }
}