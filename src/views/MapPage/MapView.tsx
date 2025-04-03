import { GoogleMap, KmlLayer, LoadScript } from "@react-google-maps/api";
import { useEffect } from "react"

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const center = { lat: 45.9636, lng: -66.6431 };

const kmlURL = "http://localhost:5000/maps/NewBrunswick.kmz"

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