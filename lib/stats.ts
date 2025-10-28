// In-memory stats storage (resets on serverless function restart)
// For production, consider using a database or Redis

export interface FortuneStats {
  totalFortunes: number;
  totalRevenue: number;
  categories: {
    love: number;
    career: number;
    wisdom: number;
    random: number;
  };
}

const stats: FortuneStats = {
  totalFortunes: 0,
  totalRevenue: 0,
  categories: {
    love: 0,
    career: 0,
    wisdom: 0,
    random: 0,
  }
};

export function getStats(): FortuneStats {
  return { ...stats };
}

export function incrementStats(category: string): void {
  stats.totalFortunes++;
  stats.totalRevenue += 0.01;

  if (category in stats.categories) {
    stats.categories[category as keyof typeof stats.categories]++;
  }
}
