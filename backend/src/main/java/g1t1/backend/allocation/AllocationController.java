package com.example.allocationtest;

import java.util.*;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/allocation")
public class AllocationController {
    @Autowired
    private AllocationService allocationService;

    // Get all allocations of a single portfolio
    @GetMapping("/{portfolioId}")
    public ResponseEntity<List<Allocation>> getAllAllocationById(@PathVariable int portfolioId) {
        return new ResponseEntity<List<Allocation>>(allocationService.getAllAllocationById(portfolioId),HttpStatus.OK);
    }

    // Get a single allocation of a single portfolio
    @GetMapping("/{portfolioId}/{stock}")
    public ResponseEntity<List<Allocation>> getSingleAllocation(@PathVariable int portfolioId,@PathVariable String stock) {
        return new ResponseEntity<List<Allocation>>(allocationService.getSingleAllocation(portfolioId, stock),HttpStatus.OK);
    }

    // Create a new allocation for specific portfolio 
    @PostMapping("/create")
    public ResponseEntity<Allocation> createAllocation(@RequestBody Allocation payload) {
        return new ResponseEntity<Allocation>(allocationService.createAllocation(payload), HttpStatus.OK);
    }

    // Edit an exiting allocation
    @PutMapping("/edit")
    public ResponseEntity<Allocation> editAllocation(@RequestBody Allocation payload){
        return new ResponseEntity<Allocation>(allocationService.editAllocation(payload), HttpStatus.OK);
    }

    // Delete an existing allocation
    @DeleteMapping("/{portfolioId}/{stock}")
    public ResponseEntity<Allocation> deleteAllocation(@PathVariable int portfolioId,@PathVariable String stock){
        return new ResponseEntity<Allocation>(allocationService.deleteAllocation(portfolioId, stock), HttpStatus.OK);
    }

    // @PutMapping("delete/{portfoilioId}/{stock}")
    // public ResponseEntity<> deleteAllocation(){
    //     return new ResponseEntity(allocationService.deleteAllocation()
    // }
}
