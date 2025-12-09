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

  function navBtn(active: boolean): React.CSSProperties {
    return { background:'none', border:'none', cursor:'pointer', color: active ? '#0066CC' : '#64748b', fontWeight: active ? 700 : 500 };
  }

  const Navigation = () => (
    <header
      style={{
        position:'fixed', top:0, width:'100%', zIndex:50, background:'#fff',
        borderBottom:'1px solid #e5e7eb',
        boxShadow: scrollY > 50 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
      }}
    >
      <div style={{ maxWidth:1152, margin:'0 auto', padding:'16px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{
              width:36, height:36, borderRadius:8, display:'grid', placeItems:'center',
              background:'linear-gradient(135deg,#0066CC,#00CC66)', color:'#fff', fontWeight:700
            }}>PL</div>
            <span style={{ fontWeight:700, color:'#0f172a', fontSize:18 }}>PharmaLink</span>
          </div>
          <nav style={{ display:'flex', alignItems:'center', gap:16 }}>
            <button onClick={() => setCurrentPage('home')} style={navBtn(currentPage==='home')}>Accueil</button>
            <button onClick={() => setCurrentPage('medications')} style={navBtn(currentPage==='medications')}>Médicaments</button>
            <button onClick={() => setCurrentPage('pharmacies')} style={navBtn(currentPage==='pharmacies')}>Pharmacies</button>
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              style={{
                border:'1px solid #e5e7eb', background:'#fff', color:'#0f172a',
                borderRadius:8, padding:'8px 12px', cursor:'pointer'
              }}
            >{mobileMenuOpen ? 'Fermer' : 'Menu'}</button>
          </nav>
        </div>
      </div>
    </header>
  );

  const Hero = () => (
    <section style={{ background:'linear-gradient(135deg,#0066CC,#00CC66)', color:'#fff', padding:'80px 24px', textAlign:'center' }}>
      <div style={{ maxWidth:1152, margin:'0 auto' }}>
        <h1 style={{ fontSize:40, fontWeight:800, marginBottom:12 }}>Trouvez vos médicaments en un clic 💊</h1>
        <p style={{ opacity:.9, marginBottom:24 }}>PharmaLink — Disponibilité des médicaments en Algérie</p>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:12 }}>
            <input
              type="text"
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              placeholder="Rechercher un médicament..."
              onKeyDown={(e)=>{ if (e.key==='Enter') handleSearch(); }}
              style={{ flex:1, padding:14, borderRadius:8, border:'none', background:'rgba(255,255,255,0.15)', color:'#fff' }}
            />
            <button
              onClick={handleSearch}
              style={{ padding:'12px 16px', borderRadius:8, border:'none', background:'#fff', color:'#0f172a', fontWeight:700, cursor:'pointer' }}
            >
              🔍 Rechercher
            </button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:24 }}>
            {[{num:'40+',title:'Médicaments'},{num:'10',title:'Pharmacies'},{num:'2h',title:'Réservation'}].map((s,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.15)', padding:16, borderRadius:8 }}>
                <div style={{ fontSize:28, fontWeight:800 }}>{s.num}</div><div>{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const medications = ['Doliprane 1000mg','Paracétamol 500mg','Ibuprofène 400mg','Amoxicilline 1g','Augmentin 1g','Ventoline Spray','Smecta','Gaviscon','Spasfon','Motilium'];
  const pharmacies = [
    { id:1, name:'Pharmacie Centrale Alger', address:'12 Rue Didouche Mourad', distance:'0.8 km', hours:'08:00-22:00', phone:'+213 23 12 34 56', garde:false },
    { id:2, name:'Pharmacie Express 24h', address:'45 Avenue Indépendance', distance:'1.2 km', hours:'24/24', phone:'+213 23 45 67 89', garde:true },
    { id:3, name:'Pharmacie Ben Aknoun', address:'78 Rue Ben Aknoun', distance:'2.1 km', hours:'08:00-20:00', phone:'+213 23 56 78 90', garde:false },
  ];

  return (
    <div style={{ fontFamily:'system-ui,-apple-system,sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <Navigation />
      <main style={{ marginTop:88 }}>
        {currentPage==='home' && <Hero />}

        {currentPage==='medications' && (
          <section style={{ padding:'40px 24px' }}>
            <div style={{ maxWidth:1152, margin:'0 auto' }}>
              <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20 }}>Médicaments</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
                {medications.map((m,i)=>(
                  <div key={i} style={{ background:'#fff', border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.06)', borderRadius:8, padding:16, textAlign:'center' }}>
                    <div style={{ fontWeight:700 }}>{m}</div>
                    <div style={{ color:'#0066CC', marginTop:8, fontSize:14 }}>🛒 Ajouter</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage==='pharmacies' && (
          <section style={{ padding:'40px 24px' }}>
            <div style={{ maxWidth:1152, margin:'0 auto' }}>
              <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20 }}>Pharmacies</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12 }}>
                {pharmacies.map((p)=>(
                  <div key={p.id} style={{ background:'#fff', border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.06)', borderLeft:'4px solid #0066CC', borderRadius:8, padding:16 }}>
                    <div style={{ fontWeight:700 }}>{p.name}</div>
                    <div style={{ color:'#64748b' }}>📍 {p.address}</div>
                    <div style={{ color:'#64748b' }}>📏 {p.distance}</div>
                    <div style={{ color:'#64748b' }}>🕐 {p.hours}</div>
                    <div style={{ color:'#0066CC' }}>📞 {p.phone}</div>
                    {p.garde && <div style={{ color:'#ef4444', fontWeight:700, marginTop:6 }}>De Garde</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage==='results' && (
          <section style={{ padding:'40px 24px' }}>
            <div style={{ maxWidth:1152, margin:'0 auto' }}>
              <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20 }}>Résultats</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:12 }}>
                {searchResults.map((r)=>(
                  <div key={r.id} style={{ background:'#fff', border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.06)', borderLeft:'4px solid #22c55e', borderRadius:8, padding:16 }}>
                    <div style={{ fontWeight:700 }}>{r.name}</div>
                    <div style={{ color:'#64748b' }}>📏 {r.distance}</div>
                    <div style={{ color:'#64748b' }}>🕐 {r.hours}</div>
                    <div style={{ color: r.available ? '#16a34a' : '#ef4444', fontWeight:700, marginTop:6 }}>
                      {r.available ? '✅ Disponible' : '❌ Non disponible'}
                    </div>
                    <button style={{ marginTop:10, width:'100%', padding:10, borderRadius:8, border:'none', background:'#0066CC', color:'#fff', fontWeight:700, cursor:'pointer' }}>
                      Réserver
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer style={{ background:'#0f172a', color:'#fff', padding:'40px 24px' }}>
        <div style={{ maxWidth:1152, margin:'0 auto' }}>
          <div style={{ fontWeight:700 }}>© 2024 PharmaLink — Algérie 🇩🇿</div>
          <div style={{ opacity:.7, fontSize:14, marginTop:8 }}>
            Équipe: Elyssa KESSAB • Ouslimani RAYAN • Mecheri CHAHINE • Ouahabi RATEB
          </div>
        </div>
      </footer>
    </div>
  );
}
