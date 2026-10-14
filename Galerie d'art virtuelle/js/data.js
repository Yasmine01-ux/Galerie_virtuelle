/*
 * Données du site (œuvres + événements).
 * Pour ajouter une œuvre ou un événement, il suffit d'ajouter un objet ici :
 * les pages Galerie, Événements, Accueil et le formulaire de réservation se mettent à jour seuls.
 *
 * Les événements sont fictifs (données de démonstration).
 * Champ optionnel pour une œuvre : artist: "Nom de l'artiste"
 */
window.TUNART = {
  themes: ["Marine", "Médina", "Portraits", "Traditions"],

  artworks: [
    { id: 1, file: "artwork-01.jpg", w: 764, h: 500, theme: "Marine",
      title: "Barques au port",
      alt: "Peinture de voiliers et de maisons blanches se reflétant dans l'eau d'un port",
      text: "Reflets dorés sur l'eau et voiliers amarrés devant les maisons blanchies à la chaux." },
    { id: 2, file: "artwork-02.jpg", w: 473, h: 373, theme: "Marine",
      title: "Plage aux barques de pêche",
      alt: "Peinture de barques de pêche et de filets sur une plage devant un village blanc",
      text: "Filets, barques et façades claires sous un ciel lumineux : le quotidien des pêcheurs." },
    { id: 3, file: "artwork-03.jpg", w: 207, h: 314, theme: "Portraits",
      title: "Portrait expressionniste",
      alt: "Portrait d'un homme coiffé d'un fez rouge, peint en touches épaisses",
      text: "Touches épaisses et couleurs vives pour un visage pensif coiffé du fez." },
    { id: 4, file: "artwork-04.jpg", w: 1000, h: 739, theme: "Médina",
      title: "Façade aux arcs rayés",
      alt: "Peinture d'une façade de médina avec des arcs rayés noir et blanc et des palmiers",
      text: "Arcs bicolores, escalier et auvent rouge et blanc dans une médina ensoleillée." },
    { id: 5, file: "artwork-05.jpg", w: 842, h: 1000, theme: "Portraits",
      title: "Le vieil homme assis",
      alt: "Portrait d'un homme âgé en tenue bleue traditionnelle, assis et appuyé sur un bâton",
      text: "Un homme âgé en tenue traditionnelle bleue, saisi dans une lumière franche." },
    { id: 6, file: "artwork-06.jpg", w: 800, h: 600, theme: "Traditions",
      title: "Couple en tenue traditionnelle",
      alt: "Peinture colorée et géométrique d'un couple en costumes traditionnels tunisiens",
      text: "Composition aux motifs géométriques, entre cubisme et costumes traditionnels." },
    { id: 7, file: "artwork-07.jpg", w: 819, h: 1000, theme: "Traditions",
      title: "Le potier",
      alt: "Peinture d'un potier en gilet rouge façonnant un vase d'argile sur son tour",
      text: "Un artisan façonne l'argile : tons chauds et gestes précis de l'atelier." },
    { id: 8, file: "artwork-08.jpg", w: 800, h: 955, theme: "Traditions",
      title: "Femme aux motifs floraux",
      alt: "Peinture d'une femme entourée de fleurs et de motifs de mosaïque colorés",
      text: "Silhouette ornée de fleurs et de mosaïques, inspirée du décor tunisien." },
    { id: 9, file: "artwork-09.jpg", w: 807, h: 1000, theme: "Médina",
      title: "Ruelle voûtée",
      alt: "Peinture d'une ruelle de médina voûtée éclairée d'une lumière chaude, avec une porte verte",
      text: "Passage voûté baigné de lumière chaude, porte verte au premier plan." },
    { id: 10, file: "artwork-10.jpg", w: 718, h: 1000, theme: "Médina",
      title: "Scène de marché",
      alt: "Peinture d'une foule sous les arcades d'une place de marché",
      text: "Foule sous les arcades d'une place, touches rapides et couleurs terreuses." }
  ],

  events: [
    { id: "ouverture", title: "Exposition d'ouverture", type: "Vernissage",
      date: "2026-09-25", time: "18:00", price: 0 },
    { id: "lumieres-medina", title: "Lumières de la Médina", type: "Vernissage",
      date: "2026-12-18", time: "18:00", price: 20 },
    { id: "atelier-huile", title: "Découverte de la peinture à l'huile", type: "Atelier",
      date: "2026-12-19", time: "15:00", price: 30 },
    { id: "visite-marines", title: "Marines et ports tunisiens", type: "Visite guidée",
      date: "2026-12-22", time: "17:30", price: 15 },
    { id: "conference-xx", title: "L'art tunisien au XXe siècle", type: "Conférence",
      date: "2026-12-27", time: "19:00", price: 10 },
    { id: "artisans", title: "Artisans et traditions", type: "Rencontre",
      date: "2027-01-08", time: "18:00", price: 15 }
  ]
};
