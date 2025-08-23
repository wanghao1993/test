'use client'; // 明确声明为客户端组件

import { WagmiProvider } from "wagmi";//Web3 交互库，封装了钱包连接、合约调用等区块链操作
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";//异步状态管理库，优化数据获取、缓存和更新逻辑
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { config,defaultNetwork } from "@/config/wagmi";//自定义的 wagmi 配置对象，包含链（Chain）定义、RPC 节点、钱包连接器等关键设置

interface ProviderProps {
    children: React.ReactNode;
  }

export default function Provider({ children }: ProviderProps) {
    const queryClient = new QueryClient();//初始化​状态管理中心
    
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={lightTheme()}
                    modalSize="compact"
                    initialChain={defaultNetwork}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
