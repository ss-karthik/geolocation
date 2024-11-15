import javax.swing.*;
import java.awt.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    
    private static final String SERVER_URL = "https://geolocation-inky.vercel.app/get-locations-java";

    public static void main(String[] args) {
        
        JFrame frame = new JFrame("Location Data");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);
        frame.setLayout(new BorderLayout());

       
        JTextArea textArea = new JTextArea();
        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);
        frame.add(scrollPane, BorderLayout.CENTER);

        
        JButton button = new JButton("Get Locations");
        button.addActionListener(e -> fetchLocationData(textArea));
        frame.add(button, BorderLayout.SOUTH);

        
        frame.setVisible(true);
    }

   
    private static void fetchLocationData(JTextArea textArea) {
        try {
            
            URL url = new URL(SERVER_URL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }

            
            in.close();

            
            textArea.setText(content.toString());
        } catch (Exception e) {
            textArea.setText("Error fetching data: " + e.getMessage());
        }
    }
}
