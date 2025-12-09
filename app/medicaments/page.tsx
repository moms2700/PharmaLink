'use client';
import React, { useEffect, useState } from 'react';

type Medicament = {
  id: number;
  name: string;
  dci?: string;
  description?: string;
  price: number;
  category: string;
  form?: string;
  imageUrl?: string;
  stock?: number;
  prescription?: boolean;
};

const fallback: Medicament[] = [
  { id: 1, name: 'Paracétamol 500mg x16', price: 250, category: 'Douleur', imageUrl: 'https://images.unsplash.com/photo-1587017620151-3b6a957b5a58?w=400' },
  { id: 2, name: 'Ibuprofène 400mg x12', price: 350, category: 'Douleur', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
  { id: 4, name: 'Vitamine D3 1000 UI x30', price: 900, category: 'Vitamines', imageUrl: 'https://images.unsplash.com/photo-1582738412016-b6c2b44b3e6b?w=400' },
];

export default function Page() {
  const [data, setData] = useState<Medicament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/medicaments', { next: { revalidate: 0 } });
        if (!res.ok) throw new Error('fetch failed');
        const json = await res.json();
        if (Array.isArray(json) && json.length) setData(json);
        else setData(fallback);
      } catch {
        setData(fallback);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Médicaments</h1>
        <p style={{ color: '#64748b', marginTop: 8 }}>Catalogue avec images et prix (DA)</p>
      </header>

      {loading ? (
        <div style={{ padding: 24 }}>Chargement...</div>
      ) : data.length === 0 ? (
        <div style={{ padding: 24 }}>Aucun médicament disponible.</div>
      ) : (
        <main style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {data.map((m) => (
              <div key={m.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
                <div style={{ width: '100%', height: 150, background: '#f1f5f9', display: 'grid', placeItems: 'center' }}>
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt={m.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#64748b' }}>Image indisponible</span>
                  )}
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  {m.category && <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{m.category}</div>}
                  <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{m.price} DA</div>
                    <button style={{ border: 'none', padding: '8px 12px', borderRadius: 6, background: '#0066CC', color: '#fff', cursor: 'pointer' }}>
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
