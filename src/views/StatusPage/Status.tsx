import { useState } from "react";
import Papa from 'papaparse';

interface CSVData{
    [key: string]: string | number;
}

const Status = () => {
    const[file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if(file){
            Papa.parse(file, {
                complete: async (result: Papa.ParseResult<CSVData>) => {
                    console.log('Parsed CSV Data:', result.data)
                    await sendJsonToBackEnd(result.data);
                },
                header: true
            })
        }
    }

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload CSV File</button>
        </div>
    );
};

const sendJsonToBackEnd = async (jsonData: any[]) => {
    try{
        const response = await fetch('https://127.0.0.1:5001/dtr-tool/us-central1/receiveCSVData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        });

        if(response.ok){
            console.log("Data Successfully sent to the Backend");
        } else {
            console.error("Error Sending Data to the Backend");
        }
    } catch(error){
        console.error('Error: ', error)
    }
};

export default Status;