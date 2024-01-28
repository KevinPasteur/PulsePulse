import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getThumbnailUrl(bodyParts: string | string[]): string {
    const thumbnailUrls: { [key: string]: string } = {
      arms: 'assets/images/arms.png',
      biceps: 'assets/images/biceps.png',
      forearms: 'assets/images/forearms.png',
      triceps: 'assets/images/triceps.png',
      hamstrings: 'assets/images/hamstrings.png',
      traps: 'assets/images/traps.png',
      lowerback: 'assets/images/lowerback.png',
      glutes: 'assets/images/glutes.png',
      calves: 'assets/images/calves.png',
      quadriceps: 'assets/images/quadriceps.png',
      legs: 'assets/images/legs.png',
      back: 'assets/images/back.png',
      abs: 'assets/images/abs.png',
      chest: 'assets/images/chest.png',
      shoulders: 'assets/images/shoulders.png',
    };

    // Vérifiez le type d'entrée
    if (typeof bodyParts === 'string') {
      // Si c'est une chaîne simple, recherchez directement dans la table de correspondance
      return thumbnailUrls.hasOwnProperty(bodyParts)
        ? thumbnailUrls[bodyParts]
        : 'assets/images/default.png';
    } else if (Array.isArray(bodyParts)) {
      // Si c'est un tableau, parcourez les zones et retournez la première URL trouvée dans la table de correspondance
      for (const bodyPart of bodyParts) {
        if (thumbnailUrls.hasOwnProperty(bodyPart)) {
          return thumbnailUrls[bodyPart];
        }
      }
    }

    // Retournez une URL par défaut si aucune correspondance trouvée
    return 'assets/images/default.png';
  }

  translateBodyPart(part: string): any {
    const translations: { [key: string]: string } = {
      arms: 'Bras',
      chest: 'Pectoraux',
      abs: 'Abdos',
      legs: 'Jambes',
      shoulders: 'Épaules',
      biceps: 'Biceps',
      triceps: 'Triceps',
      forearms: 'Avant-bras',
      traps: 'Trapèzes',
      back: 'Dos',
      lowerback: 'Bas du dos',
      glutes: 'Fessiers',
      quadriceps: 'Quadriceps',
      hamstrings: 'Ischio-jambiers',
      calves: 'Mollets',
    };
    return translations[part] || part;
  }
}
