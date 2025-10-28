import { NextResponse } from 'next/server';

export async function GET() {
  const network = process.env.NETWORK || "base-sepolia";
  const payTo = process.env.ADDRESS;

  return NextResponse.json({
    status: "ok",
    message: "🔮 AI Fortune Teller is online",
    config: {
      network,
      payTo,
    },
  });
}
