import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const DISTRICT_COORDS = {
  'Kampala': [0.3136, 32.5811],
  'Wakiso': [0.4044, 32.4467],
  'Mukono': [0.2833, 32.7833],
  'Gulu': [2.7667, 32.3000],
  'Jinja': [0.4167, 33.2000],
  'Mbarara': [-0.6167, 30.6500]
};

const SEVERITY_COLORS = {
  high: '#ef4444',   // red-500
  medium: '#f97316', // orange-500
  low: '#eab308',    // yellow-500
  safe: '#22c55e'    // green-500
};

export default function OSMMap({ riskData }) {
  // Center roughly on Uganda
  const center = [1.3733, 32.2903];
  
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative z-0">
      <MapContainer center={center} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {riskData.map((data, idx) => {
          const coords = DISTRICT_COORDS[data.location];
          if (!coords) return null;

          const color = SEVERITY_COLORS[data.severity] || SEVERITY_COLORS.safe;

          return (
            <CircleMarker
              key={idx}
              center={coords}
              pathOptions={{ fillColor: color, color: color, weight: 2, fillOpacity: 0.6 }}
              radius={data.severity === 'high' ? 25 : data.severity === 'medium' ? 18 : 12}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-center font-sans">
                  <strong>{data.location}</strong><br/>
                  Cases: {data.totalCases}<br/>
                  Risk: <span style={{color: color, textTransform: 'capitalize'}}>{data.severity}</span>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
