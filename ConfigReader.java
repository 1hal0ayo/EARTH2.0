import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

public class ConfigReader {

    public static void main(String[] args) {
        try {
            // Load and read the YAML configuration
            Yaml yaml = new Yaml();
            try (FileInputStream yamlInputStream = new FileInputStream("config.yaml")) {
                Map<String, Object> yamlData = yaml.load(yamlInputStream);
                System.out.println("YAML Configuration:");
                System.out.println(yamlData);
            }

            // Load and read the JSON configuration
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File("config.json");
            JsonNode jsonData = objectMapper.readTree(jsonFile);
            System.out.println("\nJSON Configuration:");
            System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonData));

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
