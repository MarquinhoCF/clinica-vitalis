import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const LeafletMap = () => {
    const position = [51.505, -0.09];

    return (
        <>
            <MapContainer center={position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                    position={position} 
                    icon={
                        new Icon({
                            iconUrl: require('leaflet/dist/images/marker-icon.png'),
                            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                        })
                    }
                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default LeafletMap;
