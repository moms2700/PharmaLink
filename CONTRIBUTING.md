# 🤝 Guide de Contribution - PharmaLink

Merci de votre intérêt pour contribuer à PharmaLink ! Ce guide vous aidera à démarrer.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Standards de Code](#standards-de-code)
- [Processus de Pull Request](#processus-de-pull-request)
- [Signaler un Bug](#signaler-un-bug)
- [Proposer une Fonctionnalité](#proposer-une-fonctionnalité)

## 🤝 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- Soyez respectueux et inclusif
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est mieux pour la communauté
- Faites preuve d'empathie envers les autres membres

## 🛠️ Comment Contribuer

### 1. Fork le Projet

```bash
# Forkez via GitHub, puis clonez votre fork
git clone https://github.com/votre-username/PharmaLink.git
cd PharmaLink
```

### 2. Créez une Branche

```bash
# Pour une nouvelle fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite

# Pour un bug fix
git checkout -b fix/correction-bug

# Pour de la documentation
git checkout -b docs/amelioration-docs
```

### 3. Installez les Dépendances

```bash
npm install
```

### 4. Faites vos Modifications

- Écrivez du code clair et documenté
- Suivez les conventions de nommage
- Testez vos changements localement

### 5. Committez vos Changements

```bash
git add .
git commit -m "feat: ajout de la fonctionnalité X"
```

**Format des commits :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

### 6. Poussez vers GitHub

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

### 7. Ouvrez une Pull Request

Allez sur GitHub et créez une Pull Request depuis votre branche.

## 💻 Standards de Code

### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string
  name: string
  email: string
}

const user: User = {
  id: '123',
  name: 'Ahmed',
  email: 'ahmed@example.com'
}

// ❌ Mauvais
const user = {
  id: '123',
  name: 'Ahmed',
  email: 'ahmed@example.com'
}
```

### React Components

```tsx
// ✅ Bon
export default function MedicamentCard({ name, price }: Props) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{formatPrice(price)}</p>
    </div>
  )
}

// ❌ Mauvais
export default function MedicamentCard(props) {
  return (
    <div style={{ padding: '10px' }}>
      <h3>{props.name}</h3>
      <p>{props.price}</p>
    </div>
  )
}
```

### Styling

- Utilisez **Tailwind CSS** pour tous les styles
- Évitez les styles inline sauf cas exceptionnel
- Utilisez les composants de `components/ui`

### Nommage

- **Fichiers** : PascalCase pour les composants (`MedicamentCard.tsx`)
- **Fonctions** : camelCase (`getUserLocation`)
- **Constantes** : UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types** : PascalCase (`interface MedicamentCardProps`)

## 🔄 Processus de Pull Request

1. **Décrivez vos changements** : Expliquez clairement ce que vous avez fait
2. **Liez les issues** : Mentionnez `Fixes #123` si applicable
3. **Captures d'écran** : Ajoutez des images si changements visuels
4. **Tests** : Assurez-vous que tout fonctionne
5. **Revue** : Attendez l'approbation d'un mainteneur

### Template de PR

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests effectués
- [ ] Test manuel sur desktop
- [ ] Test manuel sur mobile
- [ ] Tests automatisés (si applicable)

## Captures d'écran
(Si applicable)
```

## 🐛 Signaler un Bug

Créez une issue GitHub avec :

- **Titre clair** : "Bug: Description courte"
- **Description** : Que se passe-t-il ?
- **Étapes pour reproduire** :
  1. Allez sur '...'
  2. Cliquez sur '...'
  3. Voir l'erreur
- **Comportement attendu** : Que devrait-il se passer ?
- **Captures d'écran** : Si applicable
- **Environnement** :
  - OS : [ex: macOS 14.0]
  - Navigateur : [ex: Chrome 120]
  - Version Node : [ex: 18.17.0]

## 💡 Proposer une Fonctionnalité

Créez une issue GitHub avec :

- **Titre** : "Feature: Description"
- **Problème** : Quel problème cela résout-il ?
- **Solution** : Comment devrait-elle fonctionner ?
- **Alternatives** : Avez-vous considéré d'autres approches ?
- **Contexte** : Informations supplémentaires

## 📚 Domaines de Contribution

### Frontend
- Amélioration UI/UX
- Composants réutilisables
- Animations
- Responsive design

### Backend
- API endpoints
- Optimisation des requêtes
- Gestion des erreurs
- Sécurité

### Base de Données
- Schémas Prisma
- Migrations
- Optimisation des requêtes
- Seed data

### Documentation
- README
- Guides
- Commentaires de code
- Traductions

### Tests
- Tests unitaires
- Tests d'intégration
- Tests E2E

## 🎯 Priorités Actuelles

- [ ] Application mobile React Native
- [ ] Scan d'ordonnance par IA
- [ ] Notifications push
- [ ] Support multilingue (Arabe)
- [ ] Tests automatisés
- [ ] Paiement en ligne
- [ ] Chat pharmacien

## 📞 Besoin d'Aide ?

- **Discord** : Rejoignez notre serveur (lien à venir)
- **Email** : dev@pharmalink.dz
- **Issues** : Posez vos questions sur GitHub

## 🙏 Remerciements

Merci à tous les contributeurs qui améliorent PharmaLink !

Liste des contributeurs :
- Elyssa KESSAB
- Ouslimani RAYAN
- Mecheri CHAHINE
- Ouahabi RATEB

---

**Ensemble, améliorons l'accès aux médicaments en Algérie ! 🇩🇿**
