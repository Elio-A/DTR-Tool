import { useEffect } from "react"

const NbPower: React.FC = () => {
    const handleHomePage = async () => {
    }
    
    useEffect(() => {
        console.log("In Home Screen")
    }, []);

    return(
        <div>
            <h2>
                Hello. You are in the Home page
            </h2>
            <iframe src="https://www.google.com/maps/d/embed?mid=11_yj6yCqWqzKCgpXgYXGJEjQaIQ&ehbc=2E312F" width="640" height="480"></iframe>
        </div>        
    )
}

export default NbPower