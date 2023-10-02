package com.example.allocationtest;

import org.springframework.stereotype.Repository;

import java.util.*;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface AllocationRepository extends MongoRepository<Allocation, ObjectId>{
    
}
