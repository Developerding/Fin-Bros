package com.example.allocationtest;

import java.util.*;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.mongodb.core.query.Query;

@Service
public class AllocationService {
    @Autowired
    private AllocationRepository allocationRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Allocation> getAllAllocationById(int portfolioId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("portfolioId").is(portfolioId));

        try {
             List<Allocation> allocations = mongoTemplate.find(query, Allocation.class);
             return allocations;
        }
        catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    };

    public List<Allocation> getSingleAllocation(int portfolioId, String stock) {
        Query query = new Query();
        query.addCriteria(
            new Criteria().andOperator(
                Criteria.where("portfolioId").is(portfolioId),
                Criteria.where("stock").is(stock)
            )
        );

        try {
             List<Allocation> allocation = mongoTemplate.find(query, Allocation.class);
             return allocation;
        }
        catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Allocation createAllocation(Allocation newAllocation) {
        String stock = newAllocation.getStock();
        double price = newAllocation.getPrice();
        int quantity = newAllocation.getQuantity();
        int capitalAllocated = newAllocation.getCapitalAllocated();
        double percentage = newAllocation.getPercentage();
        int portfolioId = newAllocation.getPortfolioId();

        try {
             List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
             
             if (existingAllocation.isEmpty()) {
                Allocation allocation = allocationRepository.insert(new Allocation(stock, price, quantity, capitalAllocated, percentage, portfolioId));
                return allocation;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            
        }
        return null; 
    }

    public Allocation deleteAllocation(int portfolioId,String stock) {
        try {
             List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
             
             if (!existingAllocation.isEmpty()) {
                allocationRepository.delete(existingAllocation.get(0));
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            
        }
        return null; 
    }
    
    public Allocation editAllocation(Allocation updatedAllocation) {
        int portfolioId = updatedAllocation.getPortfolioId();
        String stock = updatedAllocation.getStock();

        try {
            List<Allocation> existingAllocation = getSingleAllocation(portfolioId, stock);
            Allocation currentAllocation = existingAllocation.get(0);
            currentAllocation.setCapitalAllocated(updatedAllocation.getCapitalAllocated());
            currentAllocation.setPrice(updatedAllocation.getPrice());
            currentAllocation.setQuantity(updatedAllocation.getQuantity());
            currentAllocation.setPercentage(updatedAllocation.getPercentage());
            allocationRepository.save(currentAllocation);

            return currentAllocation;
        }
        catch (Exception e) {
            e.printStackTrace();
            
        }
        return null; 
    }
}
