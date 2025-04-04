import {onRequest} from "firebase-functions/v2/https";
import axios from "axios";
import * as admin from 'firebase-admin';

admin.initializeApp();

export const requestMapInformation = onRequest(async (request, response) => {
    try{
        const resp = await axios.get("http://localhost:4200/getMapData");
        console.log(resp.data)
        response.json(resp.data)
    } catch (error) {
        response.status(500).send("Error calling Backend")
    }
});

export const receiveCSVData = onRequest(async (request, response) => {
    if(request.method === "POST") {
        try{
            const jsonData = request.body
            await axios.post('http://localhost:4200/receiveCSVData', jsonData);
            response.status(200).send('CSV data successfully received and forwarded');
        } catch (error) {
            console.error('Error receiving or forwarding data: ', error)
            response.status(500).send('Error processing CSV Data');
        }
    } else {
        response.status(405).send('Method Not Allowed')
    }
});