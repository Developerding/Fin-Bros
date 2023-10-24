package g1t1.backend;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.crazzyghost.alphavantage.AlphaVantage;
import com.crazzyghost.alphavantage.Config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(BackendApplication.class, args);

		ClassLoader classLoader = BackendApplication.class.getClassLoader();

		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());

		FileInputStream serviceAccount = new FileInputStream(file.getAbsoluteFile());
		
		FirebaseOptions.Builder builder = FirebaseOptions.builder();

		FirebaseOptions options = builder.setCredentials(
			GoogleCredentials.fromStream(serviceAccount)
			)
			.build();

		if (FirebaseApp.getApps().isEmpty()) {
			FirebaseApp.initializeApp(options);
		}

		System.out.println("Connected to Firebase!");

		Config cfg = Config.builder()
            .key("YX2FGEIVWJY89MVU")
            .build();

        AlphaVantage.api().init(cfg);

		System.out.println("Alpha Vantage API connected!");

	}
}
