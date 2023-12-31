# Etapa de compilação
FROM maven:3.8.4-openjdk-17 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo pom.xml primeiro para aproveitar o cache do Maven
COPY pom.xml .

# Copia o código-fonte do projeto
COPY src ./src

# Compila e empacota o projeto usando o Maven
RUN mvn clean package -DskipTests

# Etapa de execução
FROM openjdk:17-jdk

# Define o diretório de trabalho para o local onde o JAR foi gerado
WORKDIR /app

# Copia o JAR gerado na etapa de compilação para dentro do contêiner
COPY --from=build /app/target/aqueca-vidas-0.0.1-SNAPSHOT.jar .

# Define o comando de inicialização para executar o aplicativo Java
CMD ["java", "-jar", "aqueca-vidas-0.0.1-SNAPSHOT.jar"]
