'use client';
import React, { useMemo, useState } from 'react';
import PharmaciesMap from '../components/PharmaciesMap';

type Pharmacy = { id: number; name: string; lat: number; lng: number; garde?: boolean; address?: string; distance?: string; hours?: string };

const sample: Pharmacy[] = [
  { id: 1, name: 'Pharmacie Centrale Alger', lat: 36.7525, lng: 3.04197, address: '12 Rue Didouche Mourad', distance: '0.8 km', hours: '08:00-22:00' },
  { id: 2, name: 'Pharmacie Express 24h', lat: 36.763, lng: 3.053, garde: true, address: '45 Avenue Indépendance', distance: '1.2 km', hours: '24/24' },
  { id: 3, name: 'Pharmacie Ben Aknoun', lat: 36.732, lng: 3.006, address: '78 Rue Ben Aknoun', distance: '2.1 km', hours: '08:00-20:00' },
  { id: 4, name: 'Pharmacie Hydra', lat: 36.736, lng: 3.058, garde: true, address: '23 Boulevard Hydra', distance: '1.5 km', hours: '08:00-21:00' },
];

export default function Page() {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const pharmacies = useMemo(() => sample, []);
  const selected = pharmacies.find((p) => p.id === selectedId);

  return (
    <div style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1>Pharmacies proches</h1>
      <PharmaciesMap pharmacies={pharmacies} onSelect={setSelectedId} selectedId={selectedId} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {pharmacies.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            style={{
              textAlign: 'left', border: '1px solid #e5e7eb', borderRadius: 8, background: selectedId === p.id ? '#eff6ff' : '#fff', padding: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 800 }}>{p.name}</div>
              {p.garde && <span style={{ background: '#ef4444', color: '#fff', borderRadius: 6, padding: '2px 6px', fontSize: 12 }}>De garde</span>}
            </div>
            <div style={{ color: '#64748b', marginTop: 4 }}>📍 {p.address}</div>
            <div style={{ color: '#64748b' }}>�� {p.distance} • 🕐 {p.hours}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 16 }}>
          <div style={{ fontWeight: 800 }}>Sélectionnée: {selected.name}</div>
          <div style={{ color: '#64748b' }}>{selected.address}</div>
          <div style={{ marginTop: 8 }}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${selected.lat},${selected.lng}`)}`}
              target="_blank" rel="noreferrer"
              style={{ background: '#0066CC', color: '#fff', padding: '8px 12px', borderRadius: 6 }}
            >
              Itinéraire
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
