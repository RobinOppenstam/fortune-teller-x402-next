import { NextRequest, NextResponse } from 'next/server';
import { generateFortune } from '@/lib/openai';
import { incrementStats } from '@/lib/stats';

// x402 payment verification middleware
// TODO: Integrate x402 payment verification here
// For now, this is a placeholder that accepts all requests

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    const payTo = process.env.ADDRESS;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!payTo || !openaiApiKey) {
      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "Missing required environment variables. Please configure ADDRESS and OPENAI_API_KEY.",
        },
        { status: 500 }
      );
    }

    // TODO: Add x402 payment verification here
    // const paymentVerified = await verifyX402Payment(request);
    // if (!paymentVerified) {
    //   return NextResponse.json({ error: 'Payment required' }, { status: 402 });
    // }

    const body = await request.json().catch(() => ({}));
    const category = body.category || "random";
    const question = body.question || "";

    // Generate fortune using OpenAI
    const fortune = await generateFortune(category, question);

    // Update stats
    incrementStats(category);

    // Return the fortune with mystical flair
    return NextResponse.json({
      success: true,
      fortune,
      category,
      timestamp: new Date().toISOString(),
      message: "🔮 Your fortune has been revealed...",
    });
  } catch (error: any) {
    console.error("Fortune generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate fortune",
      },
      { status: 500 }
    );
  }
}
