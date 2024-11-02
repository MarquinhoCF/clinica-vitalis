import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geometries from '../../data/geometries.json';
import '../../styles/LeafletMap.css'

const LeafletMap = () => {
    const [ufData, setUfData] = useState(geometries.features || []);
    const [hoveredState, setHoveredState] = useState(null);
    const [patientCounts, setPatientCounts] = useState({});
    const brazilPosition = [-15.7801, -53.9292];

    useEffect(() => {
        // Fetch dos dados de contagem de pacientes
        const fetchPatientCounts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/patient/countByState');
                const data = await response.json();
                setPatientCounts(data);
            } catch (error) {
                console.error('Erro ao buscar dados dos pacientes:', error);
            }
        };

        fetchPatientCounts();

        console.log('Dados dos pacientes:', patientCounts);
    }, []);

    const getPolygonStyle = (state, index) => {
        const stateName = state.properties.NM_ESTADO;
        const count = patientCounts[stateName] || 0;
        return {
            color: '#007bff',
            weight: 2,
            fillColor: index === hoveredState ? '#007bff' : count > 0 ? '#00FF00' : '#999',
            fillOpacity: 0.5,
        };
    };

    return (
        <MapContainer center={brazilPosition} zoom={4}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a> contributors'
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
                    >
                        <Popup>
                            <div>
                                <strong>{uf.properties.NM_ESTADO}</strong><br />
                                Pacientes: {patientCounts[uf.properties.NM_ESTADO] || 0}
                            </div>
                        </Popup>
                    </Polygon>
                ));
            })}
        </MapContainer>
    );
};

export default LeafletMap;