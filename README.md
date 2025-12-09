# 🏥 PharmaLink - Application de Disponibilité et Réservation des Médicaments

> **Solution digitale pour trouver et réserver des médicaments en Algérie**

PharmaLink est une application web moderne qui permet aux patients de trouver facilement les médicaments disponibles dans les pharmacies les plus proches et de les réserver pendant 2 heures.

![PharmaLink](https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800)

## ✨ Fonctionnalités

### Pour les Patients
- ✅ **Recherche intelligente** : Trouvez vos médicaments par nom ou DCI
- 📍 **Géolocalisation** : Localisez les pharmacies les plus proches
- 🛒 **Panier d'achat** : Ajoutez plusieurs médicaments
- ⏰ **Réservation 2h** : Réservez vos médicaments garantis pendant 2 heures
- 🗺️ **Carte interactive** : Visualisez les pharmacies sur une carte
- 💊 **40+ médicaments** : Doliprane, Paracétamol, Ibuprofène, et plus

### Pour les Pharmacies
- 📊 **Visibilité accrue** : Apparaissez dans les résultats de recherche
- 🔔 **Notifications** : Recevez les réservations en temps réel
- 📦 **Gestion stock** : Mise à jour automatique des disponibilités

## 🚀 Technologies Utilisées

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui** (Composants UI)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Services
- **Google Maps API** (Géolocalisation et itinéraires)
- **Vercel** (Déploiement)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** 18.x ou supérieur
- **npm** ou **yarn**
- **PostgreSQL** 14.x ou supérieur

## 🛠️ Installation

### 1. Cloner le projet

```bash
cd PharmaLink
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration de la base de données

Créez une base de données PostgreSQL :

```sql
CREATE DATABASE pharmalink;
```

### 4. Configuration des variables d'environnement

Copiez le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Puis modifiez les variables :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pharmalink"

# NextAuth
NEXTAUTH_SECRET="votre-secret-key-generee"
NEXTAUTH_URL="http://localhost:3000"

# Google Maps API (optionnel mais recommandé)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="votre-cle-api-google-maps"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="PharmaLink"
```

### 5. Initialiser la base de données

```bash
# Créer les tables
npx prisma db push

# Générer le client Prisma
npx prisma generate
```

### 6. Peupler la base de données (Seed)

```bash
npm run db:seed
```

Cette commande va créer :
- ✅ 40 médicaments classiques (Doliprane, Paracétamol, Ibuprofène, etc.)
- ✅ 10 pharmacies à Alger avec leurs coordonnées GPS

### 7. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📱 Structure du Projet

```
PharmaLink/
├── app/                        # Next.js App Router
│   ├── api/                    # API Routes
│   │   ├── medicaments/        # API médicaments
│   │   └── pharmacies/         # API pharmacies
│   ├── medicaments/            # Page catalogue
│   ├── pharmacies/             # Page carte pharmacies
│   ├── panier/                 # Page panier
│   ├── commande/               # Page commande/réservation
│   ├── page.tsx                # Page d'accueil
│   ├── layout.tsx              # Layout principal
│   └── globals.css             # Styles globaux
│
├── components/                 # Composants React
│   ├── ui/                     # Composants UI de base
│   ├── Navbar.tsx              # Barre de navigation
│   ├── Footer.tsx              # Pied de page
│   └── MedicamentCard.tsx      # Carte médicament
│
├── lib/                        # Utilitaires
│   ├── prisma.ts               # Client Prisma
│   ├── utils.ts                # Fonctions utilitaires
│   └── cart.ts                 # Gestion du panier
│
├── prisma/                     # Base de données
│   ├── schema.prisma           # Schéma DB
│   └── seed.ts                 # Données initiales
│
├── public/                     # Fichiers statiques
├── .env.example                # Variables d'environnement
├── package.json                # Dépendances
├── tailwind.config.ts          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── README.md                   # Ce fichier
```

## 🎨 Pages Principales

| Page | Route | Description |
|------|-------|-------------|
| **Accueil** | `/` | Hero, présentation, catalogue |
| **Catalogue** | `/medicaments` | Liste complète des 40 médicaments |
| **Pharmacies** | `/pharmacies` | Carte interactive des pharmacies |
| **Panier** | `/panier` | Gestion du panier d'achat |
| **Commande** | `/commande` | Réservation finale |

## 🗄️ Modèle de Données

### Médicament
- Nom commercial
- DCI (Dénomination Commune Internationale)
- Prix (en DA)
- Catégorie
- Stock disponible
- Prescription requise ou non

### Pharmacie
- Nom
- Adresse complète
- Wilaya / Commune
- Coordonnées GPS (latitude, longitude)
- Téléphone
- Horaires
- Pharmacie de garde (oui/non)

### Commande
- Utilisateur
- Liste des médicaments
- Pharmacie de retrait
- Statut (PENDING, RESERVED, COMPLETED, CANCELLED)
- Réservation valable jusqu'à (2h)

## 🔑 API Endpoints

### Médicaments

```
GET /api/medicaments
Query params:
  - search: string (recherche par nom ou DCI)
  - category: string (filtrer par catégorie)
  - available: boolean (uniquement disponibles)

GET /api/medicaments/[id]
Retourne les détails d'un médicament
```

### Pharmacies

```
GET /api/pharmacies
Query params:
  - wilaya: string (filtrer par wilaya)
  - isGuard: boolean (pharmacies de garde)
  - lat, lng, radius: number (recherche géolocalisée)
```

## 🌍 Configuration Google Maps

Pour activer la carte interactive :

1. Créez un compte Google Cloud Platform
2. Activez les APIs suivantes :
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. Créez une clé API
4. Ajoutez-la dans `.env` :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="votre-cle-ici"
```

## 📊 Base de Données - Commandes Utiles

```bash
# Visualiser la base de données
npx prisma studio

# Créer une migration
npx prisma migrate dev --name nom_migration

# Réinitialiser la base
npx prisma migrate reset

# Re-seed les données
npm run db:seed
```

## 🎯 Fonctionnalités Futures

- [ ] Application mobile (React Native)
- [ ] Scan d'ordonnance par IA (OCR)
- [ ] Notifications push en temps réel
- [ ] Programme de fidélité
- [ ] Paiement en ligne (CIB, BaridiMob)
- [ ] Chat avec pharmacien
- [ ] Historique des commandes
- [ ] Support multilingue (Arabe/Français)

## 🚀 Déploiement

### Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre dépôt GitHub
3. Configurez les variables d'environnement
4. Déployez !

```bash
npm install -g vercel
vercel
```

### Déploiement de la base de données

Options recommandées :
- **Neon** : PostgreSQL serverless gratuit
- **Supabase** : PostgreSQL avec interface admin
- **Railway** : Hébergement DB simple

## 📝 Licence

Ce projet est développé par l'équipe **PharmaLink** :
- Elyssa KESSAB
- Ouslimani RAYAN
- Mecheri CHAHINE
- Ouahabi RATEB

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📞 Contact

Pour toute question ou suggestion :

- **Email** : contact@pharmalink.dz
- **Téléphone** : +213 551 23 45 67
- **Adresse** : 12 Rue Didouche Mourad, Alger Centre

---

## ⚠️ Disclaimer Médical

**Important** : Les informations fournies par PharmaLink sont à titre informatif uniquement. Consultez toujours un professionnel de santé avant de prendre un médicament. Lisez la notice avant utilisation.

---

<div align="center">
  <p>Fait avec ❤️ pour améliorer l'accès aux médicaments en Algérie</p>
  <p>© 2024 PharmaLink Algérie. Tous droits réservés.</p>
</div>
