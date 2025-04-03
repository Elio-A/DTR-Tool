package org.example.dtrtooljava;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    APICaller sender = new APICaller();

    @GetMapping("/getMapData")
    public ResponseEntity<String> getMapData() {
        return ResponseEntity.ok("Success");
    }
}
