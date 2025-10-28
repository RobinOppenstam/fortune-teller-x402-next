import { Address } from "viem";
import { paymentMiddleware, Network, Resource } from "x402-next";

const facilitatorUrl = (process.env.NEXT_PUBLIC_FACILITATOR_URL || process.env.FACILITATOR_URL || "https://x402.org/facilitator") as Resource;
const payTo = process.env.ADDRESS as Address;
const network = (process.env.NETWORK || "base-sepolia") as Network;

export const middleware = paymentMiddleware(
  payTo,
  {
    "/api/fortune": {
      price: "$0.01",
      network,
      config: {
        description: "AI Fortune Reading - Get your crypto fortune told!",
      },
    },
  },
  {
    url: facilitatorUrl,
  },
  {
    appName: "AI Fortune Teller",
    appLogo: "/image.png",
  },
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/api/fortune"],
};
