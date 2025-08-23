'use client'; // ✅ 声明为客户端组件
import { Button } from "@/components/ui/button"
import {CardTitle,} from "@/components/ui/card"
import { useAccount, useConnect, useDisconnect } from "wagmi";
/**
 * shadcn/ui 写法
 */ 
export function WalletConnect() {
    const { address } = useAccount();
    const { connectors, connect } = useConnect();
    const { disconnect } = useDisconnect();

    if (address)
        return (
            <div>
                <CardTitle>已连接钱包: {address}</CardTitle>
                <Button onClick={() => disconnect()}>断开连接</Button>
            </div>
        );

    return (
        <div>
            {connectors.map((connector) => (
                <Button key={connector.uid} onClick={() => connect({ connector })}>连接 {connector.name}</Button>
            ))}
        </div>
    );
}
