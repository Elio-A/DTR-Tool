import { Box, Button, Input, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../firebase"

const Home: React.FC = () => {
    const [Username, setUsername] = useState("")

    const navigate = useNavigate()
    const handleHomePage = async () => {
    }
    
    const handleNBPowerSite = async () => {
        navigate("/NBPower")
    }

    useEffect(() => {
        console.log("In Home Screen")
    }, []);

    const handleSubmit = async () => {
        const userData = {
            username: Username
        }
        try{
            const docRef = await addDoc(collection(db, "users"), userData);
        } catch(e) {
            console.error("Error adding document ", e);
        }
    };

    return(
        <div>
            
            <h2>
                Hello. You are in the Home page
            </h2>
            <button onClick={handleNBPowerSite}>
                NB Power website Lines
            </button>
            <br/><br/>
            <Box mb={3}>
                <TextField label="Username" variant="outlined" fullWidth value={Username} onChange={(e) => setUsername(e.target.value)} required />
            </Box>
            <Button type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </div>        
    )
}

export default Home