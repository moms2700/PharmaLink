# 📦 Installation de Node.js sur Mac

Node.js est requis pour lancer PharmaLink. Voici 3 méthodes d'installation.

---

## ⚡ Méthode 1 : Installation Directe (Plus Simple)

### Téléchargement

1. **Ouvrez Safari et allez sur :**
   ```
   https://nodejs.org/
   ```

2. **Téléchargez** la version **LTS** (Long Term Support)
   - Cliquez sur le gros bouton vert "Download"
   - Version recommandée : 18.x ou 20.x

3. **Installez** le fichier `.pkg` téléchargé
   - Double-cliquez sur le fichier
   - Suivez l'assistant d'installation
   - Acceptez les conditions
   - Entrez votre mot de passe Mac si demandé

4. **Vérifiez l'installation**
   ```bash
   # Ouvrez Terminal et tapez :
   node --version
   # Devrait afficher : v18.x.x ou v20.x.x

   npm --version
   # Devrait afficher : 9.x.x ou 10.x.x
   ```

### Durée : ~5 minutes

---

## ⚡ Méthode 2 : Avec Homebrew (Recommandé)

Homebrew est un gestionnaire de packages pour Mac.

### Étape 1 : Installer Homebrew (si pas déjà installé)

```bash
# Ouvrez Terminal et collez cette commande :
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Suivez les instructions :**
- Entrez votre mot de passe Mac
- Appuyez sur Entrée pour confirmer
- Attendez la fin de l'installation (~3 minutes)

### Étape 2 : Installer Node.js

```bash
# Installer Node.js
brew install node

# Vérifier
node --version
npm --version
```

### Avantages
- ✅ Mises à jour faciles : `brew upgrade node`
- ✅ Désinstallation facile : `brew uninstall node`
- ✅ Gestion propre des dépendances

---

## ⚡ Méthode 3 : Avec NVM (Pour Développeurs)

NVM permet de gérer plusieurs versions de Node.js.

### Installation

```bash
# 1. Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Recharger le Terminal
source ~/.zshrc
# ou
source ~/.bash_profile

# 3. Installer Node.js
nvm install 18
nvm use 18

# 4. Vérifier
node --version
```

### Avantages
- ✅ Changer de version facilement
- ✅ Tester différentes versions
- ✅ Isolement par projet

---

## 🚀 Après Installation : Lancer PharmaLink

Une fois Node.js installé :

```bash
# 1. Aller dans le projet
cd /Users/akliaitoumeziane/PharmaLink

# 2. Installer les dépendances
npm install

# 3. Configurer la base de données
# (Voir INSTALLATION.md pour PostgreSQL)

# 4. Lancer l'application
npm run dev
```

Ouvrez : http://localhost:3000

---

## 🐛 Dépannage

### Erreur : "command not found: node"

**Solution 1 : Vérifier le PATH**
```bash
# Ajouter Node.js au PATH
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Solution 2 : Réinstaller**
```bash
# Désinstaller
brew uninstall node

# Réinstaller
brew install node
```

### Erreur : "permission denied"

```bash
# Réparer les permissions npm
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER /usr/local/bin
```

### Erreur : "gyp: No Xcode or CLT version detected!"

```bash
# Installer Xcode Command Line Tools
xcode-select --install
```

---

## 📊 Vérification de l'Installation

### Test Complet

```bash
# 1. Version Node.js
node --version
# ✅ Doit afficher v18.x.x ou supérieur

# 2. Version npm
npm --version
# ✅ Doit afficher 9.x.x ou supérieur

# 3. Test simple
node -e "console.log('Node.js fonctionne!')"
# ✅ Doit afficher : Node.js fonctionne!

# 4. Test npm
npm --help
# ✅ Doit afficher l'aide npm
```

### Tout fonctionne ? ✅

Passez à l'installation de PharmaLink :
→ Consultez [INSTALLATION.md](./INSTALLATION.md)

---

## 🔄 Mise à Jour de Node.js

### Avec le Package Officiel
1. Téléchargez la dernière version sur nodejs.org
2. Installez par-dessus l'ancienne

### Avec Homebrew
```bash
brew upgrade node
```

### Avec NVM
```bash
nvm install 20
nvm use 20
```

---

## 🗑️ Désinstallation de Node.js

### Si installé via Package Officiel

```bash
# Supprimer Node.js
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/include/node
sudo rm -rf ~/.npm
sudo rm -rf ~/.node-gyp
```

### Si installé via Homebrew

```bash
brew uninstall node
brew cleanup
```

### Si installé via NVM

```bash
nvm uninstall 18
```

---

## 💡 Conseils

1. **Utilisez la version LTS** pour la stabilité
2. **Mettez à jour régulièrement** : `brew upgrade node`
3. **Gardez npm à jour** : `npm install -g npm@latest`
4. **Évitez sudo avec npm** pour éviter les problèmes de permissions

---

## 📚 Ressources

- **Site officiel :** [nodejs.org](https://nodejs.org/)
- **Documentation :** [nodejs.org/docs](https://nodejs.org/docs/)
- **npm :** [npmjs.com](https://www.npmjs.com/)
- **Homebrew :** [brew.sh](https://brew.sh/)

---

<div align="center">

## ✅ Node.js Installé = Prêt pour PharmaLink !

**Prochaine étape :** [INSTALLATION.md](./INSTALLATION.md)

</div>
