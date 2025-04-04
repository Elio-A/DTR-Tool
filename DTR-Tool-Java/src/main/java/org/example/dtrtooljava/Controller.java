package org.example.dtrtooljava;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

@RestController
public class Controller {
    APICaller sender = new APICaller();

    @GetMapping("/getMapData")
    public ResponseEntity<String> getMapData() {
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/receiveCSVData")
    public ResponseEntity<String> receiveCSVData(@RequestBody ArrayList<Map<String, Object>> data) {
        System.out.println("Received CSV Data: " + data);
        return ResponseEntity.ok("CSV Data received successfully");
    }

}
