import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Supprimer les données existantes
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.medicament.deleteMany()
  await prisma.pharmacy.deleteMany()
  await prisma.user.deleteMany()

  // Créer les 40 médicaments classiques
  const medicaments = await Promise.all([
    // Antalgiques/Antipyrétiques
    prisma.medicament.create({
      data: {
        name: 'Doliprane 1000mg',
        dci: 'Paracétamol',
        description: 'Traitement symptomatique des douleurs d\'intensité légère à modérée et/ou des états fébriles.',
        price: 150,
        category: 'Antalgique/Antipyrétique',
        dosage: '1000mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Paracétamol 500mg',
        dci: 'Paracétamol',
        description: 'Médicament antalgique et antipyrétique.',
        price: 80,
        category: 'Antalgique/Antipyrétique',
        dosage: '500mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 150,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Efferalgan 1g',
        dci: 'Paracétamol',
        description: 'Médicament antidouleur et antipyrétique à base de paracétamol.',
        price: 200,
        category: 'Antalgique/Antipyrétique',
        dosage: '1g',
        form: 'Comprimé effervescent',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 80,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Dafalgan 1g',
        dci: 'Paracétamol',
        description: 'Traitement des douleurs et de la fièvre.',
        price: 180,
        category: 'Antalgique/Antipyrétique',
        dosage: '1g',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 90,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Ibuprofène 400mg',
        dci: 'Ibuprofène',
        description: 'Anti-inflammatoire non stéroïdien, antalgique et antipyrétique.',
        price: 120,
        category: 'Anti-inflammatoire',
        dosage: '400mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        stock: 120,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Advil 400mg',
        dci: 'Ibuprofène',
        description: 'Traitement de courte durée de la fièvre et des douleurs.',
        price: 250,
        category: 'Anti-inflammatoire',
        dosage: '400mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Nurofen 200mg',
        dci: 'Ibuprofène',
        description: 'Soulagement rapide de la douleur et de la fièvre.',
        price: 300,
        category: 'Anti-inflammatoire',
        dosage: '200mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        stock: 85,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Aspegic 1000mg',
        dci: 'Acide acétylsalicylique',
        description: 'Médicament antalgique, antipyrétique et anti-inflammatoire.',
        price: 220,
        category: 'Anti-inflammatoire',
        dosage: '1000mg',
        form: 'Poudre pour solution buvable',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        stock: 70,
      },
    }),

    // Antibiotiques
    prisma.medicament.create({
      data: {
        name: 'Amoxicilline 1g',
        dci: 'Amoxicilline',
        description: 'Antibiotique de la famille des pénicillines.',
        price: 450,
        category: 'Antibiotique',
        dosage: '1g',
        form: 'Comprimé',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
        stock: 60,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Augmentin 1g/125mg',
        dci: 'Amoxicilline + Acide clavulanique',
        description: 'Antibiotique à large spectre.',
        price: 650,
        category: 'Antibiotique',
        dosage: '1g/125mg',
        form: 'Comprimé',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
        stock: 50,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Azithromycine 250mg',
        dci: 'Azithromycine',
        description: 'Antibiotique de la famille des macrolides.',
        price: 800,
        category: 'Antibiotique',
        dosage: '250mg',
        form: 'Comprimé',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
        stock: 40,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Ciprofloxacine 500mg',
        dci: 'Ciprofloxacine',
        description: 'Antibiotique de la famille des fluoroquinolones.',
        price: 550,
        category: 'Antibiotique',
        dosage: '500mg',
        form: 'Comprimé',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
        stock: 45,
      },
    }),

    // Système Digestif
    prisma.medicament.create({
      data: {
        name: 'Smecta',
        dci: 'Diosmectite',
        description: 'Traitement symptomatique de la diarrhée aiguë.',
        price: 350,
        category: 'Système Digestif',
        dosage: '3g',
        form: 'Poudre pour suspension buvable',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Gaviscon',
        dci: 'Alginate de sodium',
        description: 'Traitement des remontées acides et brûlures d\'estomac.',
        price: 420,
        category: 'Système Digestif',
        dosage: '500mg',
        form: 'Suspension buvable',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 80,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Maalox',
        dci: 'Hydroxyde d\'aluminium + Hydroxyde de magnésium',
        description: 'Traitement des douleurs gastriques.',
        price: 380,
        category: 'Système Digestif',
        dosage: '400mg',
        form: 'Comprimé à croquer',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 90,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Spasfon',
        dci: 'Phloroglucinol',
        description: 'Traitement des douleurs spasmodiques digestives et urinaires.',
        price: 500,
        category: 'Système Digestif',
        dosage: '80mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 110,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Motilium',
        dci: 'Dompéridone',
        description: 'Traitement des nausées et vomissements.',
        price: 450,
        category: 'Système Digestif',
        dosage: '10mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 75,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Imodium',
        dci: 'Lopéramide',
        description: 'Traitement symptomatique de la diarrhée aiguë.',
        price: 400,
        category: 'Système Digestif',
        dosage: '2mg',
        form: 'Gélule',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        stock: 85,
      },
    }),

    // Système Respiratoire
    prisma.medicament.create({
      data: {
        name: 'Rhinadvil',
        dci: 'Ibuprofène + Pseudoéphédrine',
        description: 'Traitement du rhume avec congestion nasale.',
        price: 350,
        category: 'Système Respiratoire',
        dosage: '200mg/30mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 95,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Humex Rhume',
        dci: 'Paracétamol + Chlorphénamine',
        description: 'Soulagement des symptômes du rhume.',
        price: 320,
        category: 'Système Respiratoire',
        dosage: '500mg/2mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Clarityne',
        dci: 'Loratadine',
        description: 'Traitement des allergies et rhinite.',
        price: 550,
        category: 'Système Respiratoire',
        dosage: '10mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 70,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Rhinofébral',
        dci: 'Paracétamol + Vitamine C',
        description: 'Traitement des états grippaux et rhumes.',
        price: 280,
        category: 'Système Respiratoire',
        dosage: '500mg',
        form: 'Sachet',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 120,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Toplexil Sirop',
        dci: 'Oxomémazine',
        description: 'Traitement de la toux sèche.',
        price: 480,
        category: 'Système Respiratoire',
        dosage: '0,33mg/ml',
        form: 'Sirop',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 60,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Ventoline Spray',
        dci: 'Salbutamol',
        description: 'Traitement de l\'asthme et bronchospasme.',
        price: 850,
        category: 'Système Respiratoire',
        dosage: '100µg/dose',
        form: 'Spray',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        stock: 45,
      },
    }),

    // Vitamines & Suppléments
    prisma.medicament.create({
      data: {
        name: 'Vitamine C 1g',
        dci: 'Acide ascorbique',
        description: 'Complément en vitamine C pour la fatigue et immunité.',
        price: 250,
        category: 'Vitamines',
        dosage: '1g',
        form: 'Comprimé effervescent',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 150,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Vitamine D3',
        dci: 'Cholécalciférol',
        description: 'Complément en vitamine D pour les os et immunité.',
        price: 400,
        category: 'Vitamines',
        dosage: '1000UI',
        form: 'Gouttes',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Magnésium',
        dci: 'Magnésium',
        description: 'Complément pour réduire la fatigue et le stress.',
        price: 350,
        category: 'Vitamines',
        dosage: '300mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 120,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Calcium',
        dci: 'Calcium',
        description: 'Complément pour la santé des os et dents.',
        price: 320,
        category: 'Vitamines',
        dosage: '500mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 110,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Fer',
        dci: 'Sulfate ferreux',
        description: 'Traitement de la carence en fer et anémie.',
        price: 380,
        category: 'Vitamines',
        dosage: '80mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 90,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Zinc',
        dci: 'Zinc',
        description: 'Complément pour l\'immunité et la cicatrisation.',
        price: 300,
        category: 'Vitamines',
        dosage: '15mg',
        form: 'Comprimé',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4c6513e7cc5d?w=400',
        stock: 100,
      },
    }),

    // Soins & Hygiène
    prisma.medicament.create({
      data: {
        name: 'Bétadine Solution',
        dci: 'Povidone iodée',
        description: 'Antiseptique pour plaies et désinfection cutanée.',
        price: 450,
        category: 'Soins & Hygiène',
        dosage: '10%',
        form: 'Solution',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 80,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Biafine Crème',
        dci: 'Trolamine',
        description: 'Traitement des brûlures superficielles et coups de soleil.',
        price: 650,
        category: 'Soins & Hygiène',
        dosage: '',
        form: 'Crème',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 70,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Dacryoserum',
        dci: 'Chlorure de sodium',
        description: 'Nettoyage des yeux et du nez.',
        price: 280,
        category: 'Soins & Hygiène',
        dosage: '0,9%',
        form: 'Solution',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 150,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Physiomer Spray Nasal',
        dci: 'Eau de mer',
        description: 'Nettoyage et décongestion du nez.',
        price: 520,
        category: 'Soins & Hygiène',
        dosage: '',
        form: 'Spray',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 90,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Homéoplasmine',
        dci: 'Excipients homéopathiques',
        description: 'Soin protecteur pour irritations cutanées.',
        price: 380,
        category: 'Soins & Hygiène',
        dosage: '',
        form: 'Pommade',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 100,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Hexomédine',
        dci: 'Hexamidine',
        description: 'Antiseptique pour petites plaies.',
        price: 350,
        category: 'Soins & Hygiène',
        dosage: '0,1%',
        form: 'Solution',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
        stock: 110,
      },
    }),

    // Système Cardiovasculaire
    prisma.medicament.create({
      data: {
        name: 'Kardegic 75mg',
        dci: 'Acétylsalicylate de lysine',
        description: 'Prévention cardiovasculaire et antiagrégant plaquettaire.',
        price: 420,
        category: 'Cardiovasculaire',
        dosage: '75mg',
        form: 'Poudre pour suspension buvable',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
        stock: 60,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Aspirine 100mg',
        dci: 'Acide acétylsalicylique',
        description: 'Antiagrégant plaquettaire pour prévention cardiovasculaire.',
        price: 250,
        category: 'Cardiovasculaire',
        dosage: '100mg',
        form: 'Comprimé',
        prescription: true,
        imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
        stock: 70,
      },
    }),

    // Dermatologie
    prisma.medicament.create({
      data: {
        name: 'Cicatryl Pommade',
        dci: 'Trolamine + Acide hyaluronique',
        description: 'Favorise la cicatrisation des plaies.',
        price: 550,
        category: 'Dermatologie',
        dosage: '',
        form: 'Pommade',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
        stock: 80,
      },
    }),
    prisma.medicament.create({
      data: {
        name: 'Dermaclay Gel',
        dci: 'Argile verte',
        description: 'Soin purifiant pour peaux à imperfections.',
        price: 480,
        category: 'Dermatologie',
        dosage: '',
        form: 'Gel',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
        stock: 75,
      },
    }),
  ])

  console.log(`✅ ${medicaments.length} médicaments créés`)

  // Créer des pharmacies en Algérie (Alger)
  const pharmacies = await Promise.all([
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Centrale',
        address: '12 Rue Didouche Mourad, Alger Centre',
        wilaya: 'Alger',
        commune: 'Alger Centre',
        latitude: 36.7538,
        longitude: 3.0588,
        phone: '023 12 34 56',
        hours: '08:00 - 20:00',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Ben Aknoun',
        address: '45 Avenue de l\'Indépendance, Ben Aknoun',
        wilaya: 'Alger',
        commune: 'Ben Aknoun',
        latitude: 36.7644,
        longitude: 3.0181,
        phone: '023 45 67 89',
        hours: '08:00 - 19:00',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Hydra',
        address: '78 Rue des Frères Bouadou, Hydra',
        wilaya: 'Alger',
        commune: 'Hydra',
        latitude: 36.7480,
        longitude: 3.0289,
        phone: '023 56 78 90',
        hours: '08:30 - 20:30',
        isGuard: true,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie El Biar',
        address: '23 Boulevard Colonel Amirouche, El Biar',
        wilaya: 'Alger',
        commune: 'El Biar',
        latitude: 36.7697,
        longitude: 3.0325,
        phone: '023 67 89 01',
        hours: '08:00 - 21:00',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Kouba',
        address: '156 Rue Hassiba Ben Bouali, Kouba',
        wilaya: 'Alger',
        commune: 'Kouba',
        latitude: 36.7267,
        longitude: 3.0906,
        phone: '023 78 90 12',
        hours: '08:00 - 19:30',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Bab Ezzouar',
        address: '89 Cité 1506 Logements, Bab Ezzouar',
        wilaya: 'Alger',
        commune: 'Bab Ezzouar',
        latitude: 36.7167,
        longitude: 3.1833,
        phone: '023 89 01 23',
        hours: '08:00 - 20:00',
        isGuard: true,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Draria',
        address: '34 Rue Principale, Draria',
        wilaya: 'Alger',
        commune: 'Draria',
        latitude: 36.7175,
        longitude: 2.9897,
        phone: '023 90 12 34',
        hours: '08:00 - 19:00',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Chéraga',
        address: '67 Avenue Mohamed V, Chéraga',
        wilaya: 'Alger',
        commune: 'Chéraga',
        latitude: 36.7667,
        longitude: 2.9500,
        phone: '023 01 23 45',
        hours: '08:30 - 20:00',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Bir Mourad Raïs',
        address: '12 Cité des Asphodèles, Bir Mourad Raïs',
        wilaya: 'Alger',
        commune: 'Bir Mourad Raïs',
        latitude: 36.7333,
        longitude: 3.0667,
        phone: '023 12 34 56',
        hours: '08:00 - 19:30',
        isGuard: false,
      },
    }),
    prisma.pharmacy.create({
      data: {
        name: 'Pharmacie Bordj El Kiffan',
        address: '45 Rue de la Plage, Bordj El Kiffan',
        wilaya: 'Alger',
        commune: 'Bordj El Kiffan',
        latitude: 36.7489,
        longitude: 3.1903,
        phone: '023 23 45 67',
        hours: '08:00 - 20:30',
        isGuard: true,
      },
    }),
  ])

  console.log(`✅ ${pharmacies.length} pharmacies créées`)

  console.log('🎉 Seeding terminé avec succès!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
