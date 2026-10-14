# Tun'Art – Galerie d'art virtuelle

Site web dédié à la peinture tunisienne : parcourir les œuvres par thème, les agrandir en plein écran, consulter les événements et réserver sa place.

Projet front-end réalisé en **HTML, CSS et JavaScript natif** : aucun framework, aucune installation.

![Page d'accueil](docs/screenshots/accueil.jpg)

## Fonctionnalités

- **Accueil** : vidéo d'ambiance, œuvres à la une, prochains événements.
- **Galerie** : filtres par thème (Marine, Médina, Portraits, Traditions) et visionneuse plein écran navigable au clavier (← → Échap).
- **Événements** : liste triée par date, événements passés signalés « Terminé ».
- **Réservation / Contact** : formulaire qui s'adapte au choix (question ou réservation), événement présélectionné depuis la page Événements, **total calculé automatiquement** (tarif × nombre de personnes).
- **Musique d'ambiance** : bouton marche/arrêt, état mémorisé d'une page à l'autre.
- **Responsive** : menu mobile, mise en page fluide du téléphone au grand écran.

| Galerie | Réservation | Mobile |
|---|---|---|
| ![Galerie](docs/screenshots/galerie.jpg) | ![Réservation](docs/screenshots/reservation.jpg) | ![Mobile](docs/screenshots/mobile-accueil.jpg) |

## Points techniques

- **Données centralisées** (`js/data.js`) : ajouter une œuvre ou un événement met à jour toutes les pages automatiquement.
- **Sécurité** : le DOM est construit sans `innerHTML`.
- **Accessibilité** : lien d'évitement, navigation clavier, focus visible, textes alternatifs, `aria-*`, respect de `prefers-reduced-motion`.
- **Performance** : images redimensionnées et compressées, vidéo allégée (−70 %), chargement différé des images.
- **SEO** : balises `title`, `description` et Open Graph sur chaque page.
- **Maintenance** : une seule feuille de style, un seul script, pas de code dupliqué.

## Lancer le projet

1. Cloner ou télécharger le dépôt.
2. Ouvrir `index.html` dans un navigateur.

Aucun serveur n'est nécessaire. Pour un serveur local : `python -m http.server`, puis http://localhost:8000.

## Déployer en ligne (GitHub Pages)

Dépôt GitHub → **Settings** → **Pages** → Source : branche `main`, dossier `/ (root)` → **Save**.
Le site est publié à l'adresse `https://<votre-pseudo>.github.io/<nom-du-depot>/`.

## Structure

```
├── index.html · gallery.html · evenements.html · contact.html · 404.html
├── css/style.css          Styles de tout le site
├── js/
│   ├── data.js            Œuvres et événements (à modifier ici)
│   └── main.js            Menu, musique, galerie, événements, formulaire
├── assets/                Images, vidéo, audio, favicon
└── docs/screenshots/      Captures d'écran du README
```

## Limites connues et pistes d'évolution

- **Démo front-end** : le formulaire et la connexion sont validés dans le navigateur, mais aucune donnée n'est envoyée. Pour recevoir les messages : [Formspree](https://formspree.io) ou Netlify Forms, sans backend à écrire.
- Les **événements sont fictifs**.
- Pistes : version anglaise/arabe, paiement en ligne, espace administrateur pour gérer les œuvres.

## Crédits et droits

Le code est sous licence MIT (voir `LICENSE`).
Les peintures, la vidéo et l'enregistrement musical (Symphonie n° 40 de Mozart, interprétation de David Bay) appartiennent à leurs auteurs et sont utilisés ici à titre pédagogique. Pour une diffusion publique, remplacez-les par des contenus libres de droits ou autorisés.

## Auteur

**Tun'Art Team** – projet réalisé pour démontrer des compétences en développement front-end et en design d'interface.
