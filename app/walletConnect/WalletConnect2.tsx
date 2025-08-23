'use client'; // ✅ 声明为客户端组件
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
/**
 * rainbowkit 写法
 */ 
export function WalletConnect() {
    const {isConnecting, isReconnecting } = useAccount();

    // 如果正在连接或重新连接，显示一个加载指示器
    if (isConnecting || isReconnecting) {
        return <div>加载中...</div>;
    }

    return (
        <div>
            <ConnectButton/>
        </div>
    );
}
