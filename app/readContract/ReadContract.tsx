'use client';
import { useReadContract } from "wagmi";

const contractConfig = {
  address: "0xe980e37De697598E0999D09B563e528be6E67316" as `0x${string}`,
  abi: [
    // 查询余额
    {
      name: "balanceOf",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "owner", type: "address" }],
      outputs: [{ type: "uint256" }],
    },
    // 新增：查询总供应量
    {
      name: "totalSupply",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    // 新增：查询代币符号
    {
      name: "symbol",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "string" }],
    },
    // 新增：查询小数位
    {
      name: "decimals",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint8" }],
    },
  ] as const,
};
/**
 * 手写 Abi
 */
export function ReadContract() {
  // 1. 查询余额
  const { 
    data: balance, 
    isPending: balancePending,
    error: balanceError 
  } = useReadContract({
    ...contractConfig,
    functionName: "balanceOf",
    args: ["0xe980e37De697598E0999D09B563e528be6E67316"],
  });

  // 2. 查询总供应量
  const { 
    data: totalSupply, 
    isPending: supplyPending,
    error: supplyError
  } = useReadContract({
    ...contractConfig,
    functionName: "totalSupply",
  });

  // 3. 查询代币符号
  const { 
    data: symbol, 
    isPending: symbolPending,
    error: symbolError
  } = useReadContract({
    ...contractConfig,
    functionName: "symbol",
  });

  // 4. 查询小数位
  const { 
    data: decimals, 
    isPending: decimalsPending,
    error: decimalsError
  } = useReadContract({
    ...contractConfig,
    functionName: "decimals",
  });

  // 统一加载状态和错误处理
  const isPending = balancePending || supplyPending || symbolPending || decimalsPending;
  const anyError = balanceError || supplyError || symbolError || decimalsError;

  if (isPending) return <div className="p-4 text-center">加载中...</div>;
  if (anyError) return <div className="p-4 text-red-500">数据获取失败</div>;

  return (
    <div className="border rounded-lg p-6 max-w-md mx-auto bg-white shadow-sm m-3 w-100">
      <div className="grid grid-cols-2 gap-4">
        {/* 代币符号 */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">sysmbol</p>
          <p className="font-medium">{symbol?.toString() || "N/A"}</p>
        </div>
        
        {/* 小数位精度 */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">decimals</p>
          <p className="font-medium">{decimals?.toString() || "N/A"}</p>
        </div>
        
        {/* 总供应量 */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">totalsupply</p>
          <p className="font-medium">
            {totalSupply ? 
              Number(totalSupply) / Math.pow(10, Number(decimals || 18)) : "N/A"}
          </p>
        </div>
        
        {/* 查询地址余额 */}
        {/* <div className="space-y-1">
          <p className="text-sm text-gray-500">地址余额</p>
          <p className="font-medium">
            {balance ? 
              Number(balance) / Math.pow(10, Number(decimals || 18)) : "0"}
          </p>
        </div> */}
      </div>
    </div>
  );
}
