// 封装 rainbowkit
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig, WalletList } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, okxWallet } from "@rainbow-me/rainbowkit/wallets";

const wallets: WalletList = [
  {
    groupName: "Wallets",
    wallets: [metaMaskWallet],      //okxWallet, 可设置多个钱包
  },
];
const chains = [sepolia] as const;  //mainnet, 可设置多链

const metadata = {
  name: "Nextjs Wagmi Quickstart",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
};
export const config = getDefaultConfig({
  appName: metadata.name,
  projectId: metadata.projectId,
  chains,
  transports: {
    [chains[0].id]: http(),  // 仅需配置Sepolia的RPC
    // [chains[1].id]: http(),
  },
  ssr: true,
  wallets,
});

export const defaultNetwork = chains[0];

