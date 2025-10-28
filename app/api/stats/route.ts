import { NextResponse } from 'next/server';
import { getStats } from '@/lib/stats';

export async function GET() {
  try {
    const stats = getStats();

    return NextResponse.json({
      totalFortunes: stats.totalFortunes,
      totalRevenue: `$${stats.totalRevenue.toFixed(2)}`,
      categories: stats.categories,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}
