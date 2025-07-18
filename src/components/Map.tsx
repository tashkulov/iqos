import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geoIcon from '../assets/icon/geo.svg';

interface Location {
    name: string;
    type: string;
    quantity: number;
    coords: [number, number];
}

interface MapProps {
    locations: Location[];
}

const customGeoIcon = new L.Icon({
    iconUrl: geoIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const Map: React.FC<MapProps> = ({ locations }) => {
    return (
        <MapContainer
            center={[51.235, 51.35]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {locations.map((loc) => (
                <Marker key={loc.name} position={loc.coords} icon={customGeoIcon}>
                    <Popup>
                        <strong>{loc.name}</strong>
                        <br />
                        {loc.type}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
