import React, { useState,useRef } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import 'leaflet/dist/leaflet.css';

export const Leafletmap = () => {
    const [position, setPosition] = useState({ lat: 42.880230, lng:-78.878738  });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    return (
    <>
       
        <div className="row">
                <div className="col text-center">
                    <h2>Please plot the location</h2>
                    <div className="col">
                        <MapContainer center={position} zoom={ZOOM_LEVEL} ref={mapRef}
                        style={{ height: '50vh', width: '5wh' }}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
    </>
    )
}
