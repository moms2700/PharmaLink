# 🚀 Installation Complète de PharmaLink

Ce guide vous accompagne pas à pas pour installer et lancer PharmaLink.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

### 1. Node.js et npm

```bash
# Vérifier Node.js (version 18+)
node --version

# Vérifier npm
npm --version
```

**Si non installé** : Téléchargez sur [nodejs.org](https://nodejs.org/)

### 2. PostgreSQL

```bash
# Vérifier PostgreSQL
psql --version
```

**Si non installé** :
- **Mac** : `brew install postgresql@14`
- **Ubuntu/Debian** : `sudo apt-get install postgresql`
- **Windows** : Téléchargez sur [postgresql.org](https://www.postgresql.org/download/)

### 3. Git (optionnel)

```bash
git --version
```

## 📥 Installation

### Étape 1 : Récupérer le Projet

Le projet est déjà dans `/Users/akliaitoumeziane/PharmaLink/`

```bash
cd /Users/akliaitoumeziane/PharmaLink
```

### Étape 2 : Installer les Dépendances

```bash
npm install
```

Cette commande installe :
- Next.js 14
- React 18
- TypeScript
- Prisma
- Tailwind CSS
- Et toutes les autres dépendances

⏱️ Durée : ~2-3 minutes

### Étape 3 : Configurer PostgreSQL

#### Créer la Base de Données

```bash
# Se connecter à PostgreSQL
psql postgres

# Créer la base
CREATE DATABASE pharmalink;

# Créer un utilisateur (optionnel)
CREATE USER pharmalink_user WITH PASSWORD 'votre_mot_de_passe';

# Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE pharmalink TO pharmalink_user;

# Quitter
\q
```

### Étape 4 : Configurer les Variables d'Environnement

```bash
# Créer le fichier .env
cp .env.example .env
```

Modifiez `.env` avec vos informations :

```env
# Remplacez par vos informations PostgreSQL
DATABASE_URL="postgresql://postgres:votre_password@localhost:5432/pharmalink"

# Générez un secret avec : openssl rand -base64 32
NEXTAUTH_SECRET="votre_secret_genere_ici"

# URL locale
NEXTAUTH_URL="http://localhost:3000"

# Google Maps (optionnel pour l'instant)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""

# Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="PharmaLink"
```

### Étape 5 : Initialiser la Base de Données

```bash
# Créer les tables Prisma dans PostgreSQL
npx prisma db push

# Générer le client Prisma
npx prisma generate
```

### Étape 6 : Charger les Données Initiales

```bash
# Charger 40 médicaments + 10 pharmacies
npm run db:seed
```

Vous verrez :
```
🌱 Début du seeding...
✅ 40 médicaments créés
✅ 10 pharmacies créées
🎉 Seeding terminé avec succès!
```

### Étape 7 : Lancer l'Application

```bash
npm run dev
```

Vous verrez :
```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Étape 8 : Ouvrir dans le Navigateur

Allez sur [http://localhost:3000](http://localhost:3000)

## ✅ Vérification

Vous devriez voir :

1. ✅ **Page d'accueil** avec Hero "Trouvez vos médicaments en un clic"
2. ✅ **Catalogue** avec 8 médicaments
3. ✅ **Navbar** avec logo PharmaLink
4. ✅ **Footer** avec informations

### Tester les Fonctionnalités

#### 1. Catalogue Complet
```
http://localhost:3000/medicaments
```
→ Devrait afficher 40 médicaments

#### 2. Recherche
- Tapez "Doliprane" dans la barre de recherche
- Devrait filtrer les résultats

#### 3. Panier
- Cliquez sur "Ajouter au panier" sur un médicament
- Allez sur `/panier`
- Devrait afficher l'article

#### 4. Pharmacies
```
http://localhost:3000/pharmacies
```
→ Devrait lister 10 pharmacies à Alger

#### 5. Réservation
- Ajoutez des médicaments au panier
- Cliquez sur "Passer la commande"
- Remplissez le formulaire
- Sélectionnez une pharmacie
- Confirmez la réservation

## 🛠️ Commandes Utiles

### Développement

```bash
# Lancer le serveur de dev
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start

# Linter (vérifier le code)
npm run lint
```

### Base de Données

```bash
# Visualiser la base avec Prisma Studio
npx prisma studio
# → Ouvre http://localhost:5555

# Réinitialiser la base
npx prisma migrate reset

# Re-charger les données
npm run db:seed

# Voir les logs SQL
# (déjà activé dans lib/prisma.ts)
```

### TypeScript

```bash
# Vérifier les types
npx tsc --noEmit
```

## 🌍 Activer Google Maps (Optionnel)

### 1. Obtenir une Clé API

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet "PharmaLink"
3. Activez ces APIs :
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Créez une clé API
5. Ajoutez des restrictions de domaine

### 2. Configurer la Clé

Ajoutez dans `.env` :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSy..."
```

### 3. Redémarrer

```bash
# Arrêtez le serveur (Ctrl+C)
# Relancez
npm run dev
```

→ La carte devrait maintenant s'afficher sur `/pharmacies`

## 🐛 Résolution de Problèmes

### Erreur : "Cannot find module '@prisma/client'"

```bash
npx prisma generate
```

### Erreur : "connect ECONNREFUSED"

PostgreSQL n'est pas lancé.

```bash
# Mac
brew services start postgresql@14

# Linux
sudo systemctl start postgresql

# Vérifier
psql -U postgres -c "SELECT version();"
```

### Erreur : "database 'pharmalink' does not exist"

```bash
createdb pharmalink
```

### Port 3000 déjà utilisé

```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

### Images ne s'affichent pas

Les images utilisent Unsplash. Vérifiez votre connexion internet.

### Erreur Tailwind CSS

```bash
# Réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 📊 Visualiser la Base de Données

### Méthode 1 : Prisma Studio (Recommandé)

```bash
npx prisma studio
```

→ Interface graphique sur [http://localhost:5555](http://localhost:5555)

### Méthode 2 : psql

```bash
psql -U postgres -d pharmalink

# Voir les tables
\dt

# Compter les médicaments
SELECT COUNT(*) FROM "Medicament";

# Voir les pharmacies
SELECT name, address FROM "Pharmacy";
```

## 🎯 Prochaines Étapes

Maintenant que PharmaLink fonctionne :

### Pour Développer

1. Lisez [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Explorez [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Consultez [README.md](./README.md)

### Pour Tester

1. Créez des comptes utilisateurs
2. Testez la réservation complète
3. Essayez sur mobile (responsive)

### Pour Déployer

1. Lisez la section Déploiement du README
2. Créez un compte Vercel
3. Déployez en production

## 💡 Conseils

1. **Gardez PostgreSQL lancé** quand vous développez
2. **Utilisez Prisma Studio** pour explorer la base
3. **Consultez la console** du navigateur pour les erreurs
4. **Testez sur mobile** avec Chrome DevTools
5. **Commitez régulièrement** vos changements

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs du serveur (terminal)
2. Vérifiez la console navigateur (F12)
3. Relisez ce guide
4. Contactez l'équipe : contact@pharmalink.dz

## 🎉 Félicitations !

Vous avez maintenant PharmaLink fonctionnel !

**Bon développement ! 🚀**

---

**PharmaLink** - Digitaliser l'accès au médicament en Algérie 🇩🇿
