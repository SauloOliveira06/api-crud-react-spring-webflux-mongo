package crud.user.spring.webflux.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.UuidRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "crud.user.spring.webflux.repository")
public class MongoConfig extends AbstractReactiveMongoConfiguration {

    @Value("${port}")
    private String port;

    @Value("$(dbname)")
    private String dbName;

    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017/crudAppDb");
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();

        return MongoClients.create(mongoClientSettings);
    }

    @Override
    protected String getDatabaseName() {
        return dbName;
    }

    @Bean
    protected MongoClientSettings mongoClientSettings(){
        MongoClientSettings.Builder builder = MongoClientSettings.builder();
        builder.uuidRepresentation(UuidRepresentation.JAVA_LEGACY);
        this.configureClientSettings(builder);
        return builder.build();
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClient(), "crudAppDb");
    }
}
