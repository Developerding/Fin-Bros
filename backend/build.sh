# Copy dependencies to the bin directory
mvn dependency:copy-dependencies -DoutputDirectory=bin

# Compile the Java source code using javac
javac -cp "bin/*:src\main\java" src/main/java/g1t1/backend/BackendApplication.java