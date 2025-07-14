import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
    shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});
interface Location {
    name: string;
    type: string;
    quantity: number;
    coords: [number, number];
}

interface MapProps {
    locations: Location[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
    return (
        <MapContainer
            center={[51.235, 51.35]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {locations.map((loc) => (
                <Marker key={loc.name} position={loc.coords}>
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
