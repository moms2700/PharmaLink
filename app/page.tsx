'use client';

import React, { useState } from 'react';

export default function PharmaLink() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navigation */}
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 50, 
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0066CC' }}>
            🏥 PharmaLink
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ paddingTop: '80px' }}>
        <section style={{ 
          background: 'linear-gradient(135deg, #0066CC 0%, #00CC66 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            Trouvez vos médicaments en un clic 💊
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
            PharmaLink - Disponibilité des médicaments en Algérie
          </p>
          <input 
            type="text" 
            placeholder="Rechercher un médicament (Doliprane, Ibuprofène...)"
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '12px 20px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
          <button style={{
            backgroundColor: '#00CC66',
            color: 'white',
            padding: '12px 30px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Rechercher
          </button>
        </section>

        {/* Fonctionnalités */}
        <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>1️⃣ Recherchez</h3>
              <p style={{ color: '#666' }}>Trouvez votre médicament par nom ou DCI</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>2️⃣ Localisez</h3>
              <p style={{ color: '#666' }}>Voyez les pharmacies les plus proches</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>3️⃣ Réservez</h3>
              <p style={{ color: '#666' }}>Réservez pendant 2 heures en pharmacie</p>
            </div>
          </div>
        </section>

        {/* 40 Médicaments */}
        <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            40+ Médicaments Disponibles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              'Doliprane 1000mg',
              'Paracétamol 500mg',
              'Ibuprofène 400mg',
              'Amoxicilline 1g',
              'Ventoline Spray',
              'Smecta',
              'Gaviscon',
              'Aspirine 100mg'
            ].map((med, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                padding: '15px', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <p style={{ fontWeight: 'bold' }}>{med}</p>
                <p style={{ color: '#0066CC', marginTop: '10px' }}>Ajouter au panier</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pharmacies */}
        <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            10 Pharmacies à Alger
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Pharmacie Centrale', distance: '0.8 km', hours: '08:00-22:00' },
              { name: 'Pharmacie Express 24h', distance: '1.2 km', hours: '24/24' },
              { name: 'Pharmacie Ben Aknoun', distance: '2.1 km', hours: '08:00-20:00' },
              { name: 'Pharmacie Hydra', distance: '1.5 km', hours: '08:00-21:00' },
              { name: 'Pharmacie El Biar', distance: '2.5 km', hours: '08:00-20:00' },
              { name: 'Pharmacie Kouba', distance: '3.1 km', hours: '08:00-19:30' }
            ].map((pharm, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #0066CC'
              }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{pharm.name}</h3>
                <p style={{ color: '#666', marginBottom: '5px' }}>📍 {pharm.distance}</p>
                <p style={{ color: '#666' }}>�� {pharm.hours}</p>
                <button style={{
                  marginTop: '15px',
                  backgroundColor: '#0066CC',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Voir sur la carte
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <p>© 2024 PharmaLink - Digitaliser l'accès aux médicaments en Algérie 🇩🇿</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
          Équipe: Elyssa KESSAB • Ouslimani RAYAN • Mecheri CHAHINE • Ouahabi RATEB
        </p>
      </footer>
    </div>
  );
}
