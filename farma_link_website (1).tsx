'use client';
import React, { useState, useEffect } from 'react';

export default function PharmaLink() {
  const [currentPage, setCurrentPage] = useState<'home'|'medications'|'pharmacies'|'results'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id:number,name:string,distance:string,hours:string,available:boolean,garde:boolean}>>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearchResults([
        { id: 1, name: 'Pharmacie Centrale Alger', distance: '0.8 km', hours: '08:00-22:00', available: true, garde: false },
        { id: 2, name: 'Pharmacie Express 24h', distance: '1.2 km', hours: '24/24', available: true, garde: true },
        { id: 3, name: 'Pharmacie Santé Ben Aknoun', distance: '2.1 km', hours: '08:00-20:00', available: true, garde: false },
      ]);
      setCurrentPage('results');
    }
  };

  const medications = [
    'Doliprane 1000mg','Paracétamol 500mg','Efferalgan 1g','Dafalgan 1g',
    'Ibuprofène 400mg','Advil 400mg','Nurofen 200mg','Aspegic 1000mg',
    'Amoxicilline 1g','Augmentin 1g','Azithromycine 250mg','Ciprofloxacine 500mg'
  ];

  const pharmacies = [
    { id: 1, name: 'Pharmacie Centrale Alger', address: '12 Rue Didouche Mourad', distance: '0.8 km', hours: '08:00-22:00', phone: '+213 23 12 34 56', garde: false },
    { id: 2, name: 'Pharmacie Express 24h', address: '45 Avenue Indépendance', distance: '1.2 km', hours: '24/24', phone: '+213 23 45 67 89', garde: true },
    { id: 3, name: 'Pharmacie Ben Aknoun', address: '78 Rue Ben Aknoun', distance: '2.1 km', hours: '08:00-20:00', phone: '+213 23 56 78 90', garde: false }
  ];

  return (
    <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif', backgroundColor: '#f8f9fa' }}>
      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: scrollY > 50 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066CC', margin: 0 }}>🏥 PharmaLink</h1>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentPage==='home' ? '#0066CC' : '#666' }}>Accueil</button>
            <button onClick={() => setCurrentPage('medications')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentPage==='medications' ? '#0066CC' : '#666' }}>Médicaments</button>
            <button onClick={() => setCurrentPage('pharmacies')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentPage==='pharmacies' ? '#0066CC' : '#666' }}>Pharmacies</button>
            <button onClick={() => setMobileMenuOpen(v => !v)} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}>
              {mobileMenuOpen ? 'Fermer' : 'Menu'}
            </button>
          </nav>
        </div>
      </header>

      <main style={{ marginTop: 80 }}>
        {currentPage === 'home' && (
          <section style={{ background: 'linear-gradient(135deg,#0066CC,#00CC66)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 12 }}>Trouvez vos médicaments en un clic 💊</h2>
            <p style={{ opacity: .9, marginBottom: 24 }}>PharmaLink — Disponibilité des médicaments en Algérie</p>

            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Rechercher un médicament..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                style={{ width: '100%', padding: 14, borderRadius: 8, border: 'none', marginBottom: 12 }}
              />
              <button
                onClick={handleSearch}
                style={{ width: '100%', padding: 14, borderRadius: 8, border: 'none', background: '#00CC66', color: 'white', fontWeight: 700, cursor: 'pointer' }}
              >
                🔍 Rechercher
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 900, margin: '32px auto 0' }}>
              {[
                { num: '40+', label: 'Médicaments' },
                { num: '10', label: 'Pharmacies' },
                { num: '2h', label: 'Réservation' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', padding: 20, borderRadius: 8 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700 }}>{s.num}</div>
                  <div>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'medications' && (
          <section style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 20 }}>Médicaments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
              {medications.map((m, i) => (
                <div key={i} style={{ background: 'white', padding: 14, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,.1)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600 }}>{m}</div>
                  <div style={{ color: '#0066CC', fontSize: 12, marginTop: 6 }}>🛒 Ajouter</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'pharmacies' && (
          <section style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 20 }}>Pharmacies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
              {pharmacies.map((p) => (
                <div key={p.id} style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,.1)', borderLeft: '4px solid #0066CC' }}>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: '#666' }}>📍 {p.address}</div>
                  <div style={{ color: '#666' }}>�� {p.distance}</div>
                  <div style={{ color: '#666' }}>🕐 {p.hours}</div>
                  <div style={{ color: '#0066CC' }}>📞 {p.phone}</div>
                  {p.garde && <div style={{ color: '#FF6B6B', fontWeight: 700, marginTop: 6 }}>De Garde</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'results' && (
          <section style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 20 }}>Résultats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
              {searchResults.map((r) => (
                <div key={r.id} style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,.1)', borderLeft: '4px solid #00CC66' }}>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ color: '#666' }}>📏 {r.distance}</div>
                  <div style={{ color: '#666' }}>🕐 {r.hours}</div>
                  <div style={{ color: r.available ? '#00CC66' : '#FF6B6B', fontWeight: 700, marginTop: 6 }}>
                    {r.available ? '✅ Disponible' : '❌ Non disponible'}
                  </div>
                  <button style={{ marginTop: 10, width: '100%', padding: 10, borderRadius: 6, border: 'none', background: '#0066CC', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                    Réserver
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer style={{ background: '#1a1a1a', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: 40 }}>
        <div>© 2024 PharmaLink — Algérie 🇩🇿</div>
        <div style={{ opacity: .7, fontSize: 14, marginTop: 8 }}>Équipe: Elyssa KESSAB • Ouslimani RAYAN • Mecheri CHAHINE • Ouahabi RATEB</div>
      </footer>
    </div>
  );
}
