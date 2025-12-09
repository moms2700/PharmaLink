'use client';
import React, { useEffect, useRef, useState } from 'react';
import L, { Map as LMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Pharmacy = { id: number; name: string; lat: number; lng: number; garde?: boolean; address?: string };

const iconGreen = (selected: boolean) => L.divIcon({
  html: `<div style="transform:${selected ? 'scale(1.2)' : 'scale(1)'}"><svg width="28" height="28" viewBox="0 0 24 24" fill="${selected ? '#2563eb' : '#10b981'}"><circle cx="12" cy="12" r="10"/></svg></div>`,
  iconSize: [28, 28],
});
const iconRed = L.divIcon({ html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="#ef4444"><circle cx="12" cy="12" r="10"/></svg>`, iconSize: [28, 28] });
const userIcon = L.divIcon({ html: `<div style="position:relative"><div style="width:14px;height:14px;background:#3b82f6;border-radius:50%"></div><div style="position:absolute;top:-6px;left:-6px;width:26px;height:26px;border-radius:50%;border:2px solid rgba(59,130,246,.35)"></div></div>` });

export default function PharmaciesMap({ pharmacies, onSelect, selectedId }: { pharmacies: Pharmacy[]; onSelect: (id: number) => void; selectedId?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<LMap | null>(null);
  const userMarkerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (!ref.current || map) return;
    const m = L.map(ref.current).setView([36.7525, 3.04197], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(m);
    setMap(m);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        m.setView([latitude, longitude], 14);
        const um = L.marker([latitude, longitude], { icon: userIcon }).addTo(m);
        userMarkerRef.current = um;
      });
    }
  }, [ref, map]);

  useEffect(() => {
    if (!map) return;
    const layerGroup = L.layerGroup().addTo(map);
    pharmacies.forEach((p) => {
      const icon = p.garde ? iconRed : iconGreen(selectedId === p.id);
      const mk = L.marker([p.lat, p.lng], { icon }).addTo(layerGroup);
      mk.bindPopup(`<div style="font-weight:700">${p.name}</div><div>${p.address ?? ''}</div>`);
      mk.on('click', () => onSelect(p.id));
    });
    return () => { layerGroup.clearLayers(); map.removeLayer(layerGroup); };
  }, [map, pharmacies, selectedId, onSelect]);

  return <div ref={ref} style={{ width: '100%', height: 420, borderRadius: 8, overflow: 'hidden' }} />;
}
