# AI Fortune Teller - Next.js Edition

A crypto-native AI fortune teller powered by OpenAI and x402 micropayments, built with Next.js for seamless Vercel deployment.

## Features

- 🔮 AI-powered fortune generation with OpenAI GPT-4
- 💰 **x402 micropayment integration** - $0.01 per fortune
- 🎨 Beautiful animated UI
- 📊 Real-time stats tracking
- ⚡ Server-side rendering with Next.js
- 🚀 Zero-config Vercel deployment
- 🔐 Payment verification via x402 middleware

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: OpenAI GPT-4-mini
- **Payments**: x402 protocol with `x402-next` middleware
- **Styling**: CSS with animations
- **Deployment**: Vercel

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
ADDRESS=0x... # Your wallet address
OPENAI_API_KEY=sk-... # Your OpenAI API key
NETWORK=base-sepolia
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add ADDRESS
vercel env add OPENAI_API_KEY
vercel env add NETWORK
```

### Option 2: Deploy via Git

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Next.js fortune teller"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in project settings
   - Deploy!

## Environment Variables (Vercel)

Set these in your Vercel project settings:

| Variable | Description | Required |
|----------|-------------|----------|
| `ADDRESS` | Your wallet address for receiving payments | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI API key | ✅ Yes |
| `NETWORK` | Blockchain network (e.g., base-sepolia) | Optional |
| `FACILITATOR_URL` | x402 facilitator endpoint | Optional |

## API Routes

- `GET /api/health` - Health check
- `GET /api/stats` - Get fortune statistics
- `POST /api/fortune` - Generate a fortune (requires payment in production)

## Project Structure

```
degen-fortune-teller-next/
├── app/
│   ├── api/
│   │   ├── fortune/route.ts    # Fortune generation endpoint
│   │   ├── stats/route.ts      # Stats endpoint
│   │   └── health/route.ts     # Health check
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
├── lib/
│   ├── openai.ts               # OpenAI client & fortune generation
│   └── stats.ts                # Stats tracking
└── public/
    └── image.png               # Oracle image
```

## Advantages Over Hono Version

✅ **Simpler deployment** - No separate client/server builds
✅ **Zero configuration** - Vercel handles everything
✅ **TypeScript native** - No compilation issues
✅ **Better DX** - Hot reload for both frontend and API
✅ **No CORS issues** - Same origin for all routes
✅ **Easier debugging** - Unified codebase

## How It Works

### Payment Flow

1. User connects their wallet
2. User selects a fortune category
3. User clicks "Reveal My Fortune"
4. **x402 middleware intercepts the request** to `/api/fortune`
5. Payment verification happens via x402 protocol
6. Upon successful payment, the API route generates the fortune
7. Fortune is returned and stats are updated

### x402 Integration

The app uses Next.js middleware (`middleware.ts`) to protect the `/api/fortune` endpoint:

```typescript
export const middleware = paymentMiddleware(
  payTo,
  {
    "/api/fortune": {
      price: "$0.01",
      network,
    },
  },
  { url: facilitatorUrl },
  { appName: "AI Fortune Teller" }
);
```

## Next Steps

- [ ] Add wallet connection UI to frontend
- [ ] Implement persistent stats storage (database or Redis)
- [ ] Add rate limiting
- [ ] Add more fortune categories
- [ ] Add transaction history

## License

MIT
