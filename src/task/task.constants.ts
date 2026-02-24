/** XP por nível (igual ao front-end) */
export const XP_BY_LEVEL: Record<string, number> = {
  facil: 5,
  medio: 10,
  dificil: 15,
};

export const getXpByLevel = (level: string): number => XP_BY_LEVEL[level] ?? 0;
