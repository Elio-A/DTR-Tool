import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import axios from "axios";

export const requestMapInformation = onRequest(async (request, response) => {
    try{
        const resp = await axios.get("http://localhost:4200/getMapData");
        console.log(resp.data)
        response.json(resp.data)
    } catch (error) {
        response.status(500).send("Error calling Backend")
    }
})