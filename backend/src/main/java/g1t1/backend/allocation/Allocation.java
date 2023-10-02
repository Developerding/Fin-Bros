package com.example.allocationtest;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "allocations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Allocation{
    @Id
    private ObjectId id;
    private String stock;
    private double price;
    private int quantity;
    private int capitalAllocated;
    private double percentage;
    private int portfolioId;

    public Allocation(String stock, double price, int quantity, int capitalAllocated, double percentage,int portfolioId) {
        this.stock = stock;
        this.price = price;
        this.quantity = quantity;
        this.capitalAllocated = capitalAllocated;
        this.percentage = percentage;
        this.portfolioId = portfolioId;
    }
}