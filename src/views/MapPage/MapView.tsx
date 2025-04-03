import { GoogleMap, KmlLayer, LoadScript } from "@react-google-maps/api";
import { useEffect } from "react"

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const center = { lat: 45.9636, lng: -66.6431 };

const kmlURL = "https://www.google.com/maps/d/embed?mid=1wyr97M0-FDH4euQlNhMsuFh-OAeG62U&ehbc=2E312F"

const MapView: React.FC = () => {
    useEffect(() => {
        console.log("Map View")
    }, []);
    return(
        <LoadScript googleMapsApiKey="AIzaSyBqH9Y7RtNS5onyMudk5dRB3R0g76NH-kA">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
                <KmlLayer url={kmlURL}/>
            </GoogleMap>
        </LoadScript>
    )

}

export default MapView