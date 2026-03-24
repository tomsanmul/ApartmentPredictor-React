import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SchoolMapView = () => {
    const manhattanPosition = [40.7831, -73.9712];

    return (
        <div style={{ height: '480px', width: '100%' }}>
            <p>School Map</p>
            <MapContainer center={manhattanPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={manhattanPosition}>
                    <Popup>
                        This is a popup. <br /> for a school map.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default SchoolMapView;
