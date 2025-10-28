# AI Fortune Teller - Next.js Edition

A crypto-native AI fortune teller powered by OpenAI and x402 micropayments, built with Next.js for seamless Vercel deployment.

## Features

- 🔮 AI-powered fortune generation with OpenAI GPT-4
- 💰 x402 micropayment integration (coming soon)
- 🎨 Beautiful animated UI
- 📊 Real-time stats tracking
- ⚡ Server-side rendering with Next.js
- 🚀 Zero-config Vercel deployment

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: OpenAI GPT-4-mini
- **Payments**: x402 protocol (integration in progress)
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

## Next Steps

- [ ] Integrate x402 payment verification in `/api/fortune`
- [ ] Add wallet connection UI
- [ ] Implement persistent stats storage (database or Redis)
- [ ] Add rate limiting
- [ ] Add more fortune categories

## License

MIT
