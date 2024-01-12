# Используем базовый образ с Maven для сборки
FROM maven:3.8.4-openjdk-17-slim AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы для сборки зависимостей
COPY pom.xml .
COPY src ./src

# Собираем JAR-файл
RUN mvn clean package -DskipTests

# Используем базовый образ с Java 17
FROM openjdk:17-jdk-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранный JAR-файл
COPY --from=build /app/target/*.jar app.jar

# Запускаем приложение при старте контейнера
CMD ["java", "-jar", "app.jar"]
