import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Polyline, InfoWindow } from "@react-google-maps/api";
import Papa from "papaparse";

type PowerLineData = {
    lat: number;
    lng: number;
    name: string;
    description: string;
};

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

const center = { lat: 45.9636, lng: -66.6431 };


const MapView: React.FC = () => {
    const [lines, setLines] = useState<PowerLineData[]>([]);
    const [selectedLine, setSelectedLine] = useState<PowerLineData | null>(null);
    const [zoom, setZoom] = useState(12);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

    useEffect(() => {
        fetch("/MapData.csv")
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse<PowerLineData>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    complete: (result) => {
                        const parsedData = result.data
                            .filter((row) => row.lat !== null && row.lng !== null)
                            .map((row) => ({ ...row }));
                        setLines(parsedData);
                    },
                });
            });
    }, []);

    const onPolylineClick = useCallback(
        (e: any) => {
            if (e.latLng) {
                const clickedLat = e.latLng.lat();
                const clickedLng = e.latLng.lng();

                let closestPoint: PowerLineData | null = null;
                let minDistance = Infinity;

                lines.forEach((line) => {
                    const distance = Math.sqrt(
                        Math.pow(line.lat - clickedLat, 2) +
                        Math.pow(line.lng - clickedLng, 2)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestPoint = line;
                    }
                });

                if (closestPoint) {
                    setSelectedLine(closestPoint);
                    setInfoWindowOpen(true);
                    setZoom(15);
                } else {
                    setSelectedLine(null);
                    setInfoWindowOpen(false);
                    setZoom(12);
                }
            }
        },
        [lines, setSelectedLine, setZoom]
    );

    return (
        <LoadScript googleMapsApiKey="AIzaSyBqH9Y7RtNS5onyMudk5dRB3R0g76NH-kA">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
            >
                {lines.length > 0 && (
                    <Polyline
                        path={lines.map((line) => ({ lat: line.lat, lng: line.lng }))}
                        options={{
                            strokeColor: "#FFA07A",
                            strokeOpacity: 1.0,
                            strokeWeight: 4,
                        }}
                        onClick={onPolylineClick}
                    />
                )}
                {selectedLine && (
                    <InfoWindow
                        position={{ lat: selectedLine.lat, lng: selectedLine.lng }}
                        onCloseClick={() => {
                            setSelectedLine(null);
                            setInfoWindowOpen(false);
                        }}
                        options={{
                            disableAutoPan: false,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "10px",
                                minWidth: "200px",
                                minHeight: "100px",
                                color: "black",
                            }}
                        >
                            <h3>{selectedLine?.name}</h3>
                            <p>{selectedLine?.description}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapView;
