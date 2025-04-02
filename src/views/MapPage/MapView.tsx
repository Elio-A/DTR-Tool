import { useEffect } from "react"

const MapView: React.FC = () => {
    useEffect(() => {
        console.log("Map View")
    }, []);
    return(
        <iframe 
            src="https://www.google.com/maps/d/embed?mid=1wyr97M0-FDH4euQlNhMsuFh-OAeG62U&ehbc=2E312F&noprof=1" 
            width="100%" 
            height="100%"
            style={{border: 0}}
            allowFullScreen
            loading="lazy"
            
            ></iframe>      
    )

}

export default MapView