package org.example.dtrtooljava;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class APISender {

    public final RestTemplate restTemplate = new RestTemplate();

    public void sendMapInformation(){
        System.out.println("Attempting to send map information");
        String url = "http://localhost:5173/getMapInformation";
        restTemplate.getForEntity(url, String.class);
    }
}
