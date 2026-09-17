"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface PlaceMapProps {
  lat: number;
  lng: number;
  label?: string;
}

// Central shared map component — used by Place Details, the main Map
// page, and Places Near Me, so marker/tile config only lives in one place.
export default function PlaceMap({ lat, lng, label }: PlaceMapProps) {
  return (
    <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>{label && <Popup>{label}</Popup>}</Marker>
    </MapContainer>
  );
}
