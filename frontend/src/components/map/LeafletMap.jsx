import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geometries from '../../data/geometries.json';
import './Map.css'

const LeafletMap = () => {
    const [ufData, setUfData] = useState(geometries.features || []);
    const [hoveredState, setHoveredState] = useState(null);
    const brazilPosition = [-15.7801, -53.9292];

    useEffect(() => {
        
    }, [ufData]);

    const getPolygonStyle = (state, index) => ({
        color: '#007bff',
        weight: 2,
        fillColor: index === hoveredState ? '#007bff' : (state.properties.count > 0 ? '#00FF00' : '#FFFFFF'),
        fillOpacity: 0.5
    });

    return (
        <MapContainer center={brazilPosition} zoom={4}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {ufData.map((uf, index) => {
                const polygons = uf.geometry.coordinates;

                return polygons.map((polygon, polyIndex) => (
                    <Polygon 
                        key={`${index}-${polyIndex}`}
                        positions={polygon[0].map(coord => [coord[1], coord[0]])}
                        pathOptions={getPolygonStyle(uf, index)}
                        eventHandlers={{
                            mouseover: () => {
                                setHoveredState(index);
                            },
                            mouseout: () => {
                                setHoveredState(null);
                            },
                        }}
                    />
                ));
            })}
        </MapContainer>
    );
};

export default LeafletMap;