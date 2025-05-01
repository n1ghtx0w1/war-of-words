
export function getHeroStats(heroType: string) {
    if (heroType.includes("melee")) {
      return { strength: 5, dexterity: 2, hp: 6, intelligence: 2 };
    } else if (heroType.includes("archer")) {
      return { strength: 2, dexterity: 5, hp: 4, intelligence: 4 };
    } else if (heroType.includes("cavalry")) {
      return { strength: 4, dexterity: 3, hp: 5, intelligence: 2 };
    } else {
      return { strength: 1, dexterity: 1, hp: 3, intelligence: 1 }; // fallback default
    }
  }
  