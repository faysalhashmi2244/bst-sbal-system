import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
// import { baseSepolia } from "viem/chains";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "BST APP",
  description: "Smart Base Affiliate Loop System",
  url: "https://bst-sbal.com", // origin must match your domain & subdomain
  icons: ["/logo.jpg"],
};

const baseSepolia = {
  id: 84532,
  network: "base-sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: [
        "https://rpc.ankr.com/base_sepolia/d8b45c6ca36d9f7e8f419eaf46b61b646e579e1c2e724865e3a8da0a5974fd8f",
        "https://api-sepolia.basescan.org/api",
      ],
    },
  },

  testnet: true,
};

// 3. Set the networks
const networks = [baseSepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
