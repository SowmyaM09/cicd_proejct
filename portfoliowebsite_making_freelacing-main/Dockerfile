# Use Maven with JDK 17 to build the project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (faster builds)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy all source files
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
