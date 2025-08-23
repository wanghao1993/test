'use client';
import { useState, useEffect } from 'react'
import { WalletConnect } from '@/app/walletConnect/WalletConnect2'
import { ReadContract } from '@/app/readContract/ReadContract2';
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { useAccount, useConnect, useDisconnect } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount(); // false
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isConnected) {
      setVisible(false)
    }
  }, [isConnected])
  const getData = () => {
    if (!isConnected) {
      setOpen(true);
      return;
    }
    setVisible(true);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              请先连接钱包！
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              您需要连接钱包后才能获取合约代币信息。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel >
              确定
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        <WalletConnect />
        <div className="m-3">
          {!visible && <Button variant="outline" onClick={getData}>获取合约代币</Button>}
          {visible && <ReadContract />}
        </div>
      </div>
    </>
  );
}
