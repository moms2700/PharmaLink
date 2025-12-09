# 🗺️ Configuration Google Maps API

## Étape 1: Obtenir une clé API Google Maps

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les APIs suivantes:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**

### Instructions détaillées:

#### 1. Créer/Sélectionner un projet
- Cliquez sur le sélecteur de projet en haut
- Cliquez sur "Nouveau projet"
- Donnez un nom: `PharmaLink`
- Cliquez sur "Créer"

#### 2. Activer les APIs
- Dans le menu de gauche, allez dans "APIs & Services" → "Bibliothèque"
- Recherchez et activez:
  - `Maps JavaScript API`
  - `Places API`
  - `Geocoding API`

#### 3. Créer une clé API
- Allez dans "APIs & Services" → "Identifiants"
- Cliquez sur "+ CRÉER DES IDENTIFIANTS" → "Clé API"
- Votre clé API sera générée
- **IMPORTANT**: Cliquez sur "Restreindre la clé" pour la sécuriser

#### 4. Restreindre la clé (IMPORTANT pour la sécurité)

**Restrictions d'application:**
- Sélectionnez "Sites web (référents HTTP)"
- Ajoutez vos domaines:
  ```
  https://votre-domaine.vercel.app/*
  http://localhost:3000/*
  ```

**Restrictions d'API:**
- Sélectionnez "Restreindre la clé"
- Cochez uniquement:
  - Maps JavaScript API
  - Places API
  - Geocoding API

#### 5. Ajouter la facturation (Gratuit jusqu'à 28 000 chargements/mois)
- Google Maps nécessite une carte de crédit même pour le plan gratuit
- Vous recevez **200$** de crédits gratuits par mois
- Cela équivaut à environ **28 000 chargements de carte** par mois gratuitement
- Pas de débit automatique si vous dépassez (vous devez activer manuellement)

## Étape 2: Configurer dans le projet

### Local (.env.local)
Créez ou modifiez `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=VOTRE_CLE_API_ICI
```

### Vercel (Production)
```bash
cd /Users/akliaitoumeziane/PharmaLink
npx vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production
```

Ensuite entrez votre clé API quand demandé.

Pour les autres environnements:
```bash
npx vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY preview
npx vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY development
```

## Étape 3: Vérifier la configuration

1. Démarrez le serveur local:
```bash
npm run dev
```

2. Ouvrez http://localhost:3000
3. La carte devrait s'afficher sur la page d'accueil et la page pharmacies

## Étape 4: Déployer

```bash
git add .
git commit -m "feat: Add Google Maps integration"
git push
```

Vercel déploiera automatiquement!

## 🔒 Sécurité

### ✅ À FAIRE:
- Toujours restreindre votre clé API par domaine
- Surveiller l'utilisation dans Google Cloud Console
- Ne JAMAIS committer la clé API dans Git

### ❌ À NE PAS FAIRE:
- Partager votre clé API publiquement
- Laisser la clé sans restrictions
- Utiliser la même clé pour développement et production

## 💰 Coûts

### Plan Gratuit (200$ de crédits/mois):
- **Maps JavaScript API**: 0.007$ par chargement
- **Crédits gratuits**: 28 000 chargements/mois
- **Prix après**: Très peu probable d'atteindre avec un site normal

### Exemple d'utilisation:
- 1 000 visiteurs/jour qui chargent la carte = ~30 000 chargements/mois
- Coût: **GRATUIT** (dans les limites)

## 🆘 Dépannage

### Erreur: "This page can't load Google Maps correctly"
- Vérifiez que les APIs sont activées
- Vérifiez que la facturation est configurée
- Vérifiez que la clé API est correctement définie

### La carte ne s'affiche pas
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs
- Assurez-vous que `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` est définie
- Redémarrez le serveur de développement

### Erreur de restriction de clé
- Vérifiez que votre domaine est dans la liste des domaines autorisés
- Format: `https://domaine.com/*` (avec l'astérisque)

## 📚 Ressources

- [Google Maps Platform](https://console.cloud.google.com/google/maps-apis)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [Documentation](https://developers.google.com/maps/documentation)
