'use client';

import React, { useState } from 'react';

export default function PharmaLink() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const medications = [
    'Doliprane 1000mg', 'Paracétamol 500mg', 'Ibuprofène 400mg',
    'Amoxicilline 1g', 'Augmentin 1g', 'Ventoline Spray',
    'Smecta', 'Gaviscon', 'Spasfon', 'Motilium',
    'Clarityne', 'Rhinadvil', 'Aspirine 100mg', 'Aspegic 1g',
    'Vitamine C', 'Vitamine D3', 'Magnésium', 'Calcium',
    'Fer', 'Zinc', 'Bétadine Solution', 'Biafine Crème',
    'Dacryoserum', 'Physiomer Spray', 'Homéoplasmine', 'Hexomédine',
    'Kardegic 75mg', 'Cicatryl Pommade', 'Dermaclay Gel', 'Toplexil Sirop'
  ];

  const pharmacies = [
    { id: 1, name: 'Pharmacie Centrale Alger', address: '12 Rue Didouche Mourad', distance: '0.8 km', hours: '08:00-22:00', phone: '023 12 34 56', guard: false },
    { id: 2, name: 'Pharmacie Express 24h', address: '45 Avenue Indépendance', distance: '1.2 km', hours: '24/24', phone: '023 45 67 89', guard: true },
    { id: 3, name: 'Pharmacie Ben Aknoun', address: '78 Rue Ben Aknoun', distance: '2.1 km', hours: '08:00-20:00', phone: '023 56 78 90', guard: false },
    { id: 4, name: 'Pharmacie Hydra', address: '23 Boulevard Hydra', distance: '1.5 km', hours: '08:00-21:00', phone: '023 67 89 01', guard: true },
    { id: 5, name: 'Pharmacie El Biar', address: '156 Rue El Biar', distance: '2.5 km', hours: '08:00-20:00', phone: '023 78 90 12', guard: false },
    { id: 6, name: 'Pharmacie Kouba', address: '89 Cité Kouba', distance: '3.1 km', hours: '08:00-19:30', phone: '023 89 01 23', guard: false },
    { id: 7, name: 'Pharmacie Draria', address: '34 Rue Draria', distance: '2.8 km', hours: '08:00-19:00', phone: '023 90 12 34', guard: false },
    { id: 8, name: 'Pharmacie Chéraga', address: '67 Avenue Chéraga', distance: '4.2 km', hours: '08:30-20:00', phone: '023 01 23 45', guard: false },
    { id: 9, name: 'Pharmacie Bir Mourad Raïs', address: '12 Cité BM Raïs', distance: '3.5 km', hours: '08:00-19:30', phone: '023 12 34 56', guard: false },
    { id: 10, name: 'Pharmacie Bordj El Kiffan', address: '45 Rue Bordj', distance: '4.8 km', hours: '08:00-20:30', phone: '023 23 45 67', guard: true }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa' }}>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 100,
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066CC', margin: 0 }}>
            🏥 PharmaLink
          </h1>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: currentPage === 'home' ? '#0066CC' : '#666' }}>Accueil</button>
            <button onClick={() => setCurrentPage('medications')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: currentPage === 'medications' ? '#0066CC' : '#666' }}>Médicaments</button>
            <button onClick={() => setCurrentPage('pharmacies')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: currentPage === 'pharmacies' ? '#0066CC' : '#666' }}>Pharmacies</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      {currentPage === 'home' && (
        <section style={{
          marginTop: '80px',
          background: 'linear-gradient(135deg, #0066CC 0%, #00CC66 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
            Trouvez vos médicaments en un clic 💊
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            PharmaLink - Disponibilité des médicaments en Algérie
          </p>
          
          <div style={{ maxWidth: '500px', margin: '0 auto 30px' }}>
            <input
              type="text"
              placeholder="Rechercher un médicament..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                marginBottom: '15px'
              }}
            />
            <button
              onClick={() => setCurrentPage('medications')}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#00CC66',
                color: 'white',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Rechercher
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '800px', margin: '40px auto 0' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>40+</div>
              <div>Médicaments</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>10</div>
              <div>Pharmacies</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>2h</div>
              <div>Réservation</div>
            </div>
          </div>
        </section>
      )}

      {/* MEDICAMENTS PAGE */}
      {currentPage === 'medications' && (
        <section style={{ marginTop: '80px', padding: '40px 20px', maxWidth: '1200px', margin: '80px auto 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>40+ Médicaments</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {medications.map((med, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{med}</p>
                <p style={{ color: '#0066CC', cursor: 'pointer' }}>🛒 Ajouter au panier</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PHARMACIES PAGE */}
      {currentPage === 'pharmacies' && (
        <section style={{ marginTop: '80px', padding: '40px 20px', maxWidth: '1200px', margin: '80px auto 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>10 Pharmacies à Alger</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {pharmacies.map((pharm) => (
              <div key={pharm.id} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #0066CC'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{pharm.name}</h3>
                    {pharm.guard && <span style={{ backgroundColor: '#FF6B6B', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>De Garde</span>}
                  </div>
                </div>
                <p style={{ color: '#666', margin: '10px 0' }}>📍 {pharm.address}</p>
                <p style={{ color: '#666', margin: '5px 0' }}>📏 {pharm.distance}</p>
                <p style={{ color: '#666', margin: '5px 0' }}>🕐 {pharm.hours}</p>
                <p style={{ color: '#0066CC', margin: '10px 0', cursor: 'pointer' }}>📞 {pharm.phone}</p>
                <button style={{
                  width: '100%',
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: '#0066CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Voir sur la carte
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <p>© 2024 PharmaLink - Digitaliser l'accès aux médicaments en Algérie 🇩🇿</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
          Équipe: Elyssa KESSAB • Ouslimani RAYAN • Mecheri CHAHINE • Ouahabi RATEB
        </p>
      </footer>
    </div>
  );
}
