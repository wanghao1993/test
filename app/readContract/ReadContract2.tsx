'use client';
import { useReadContracts } from "wagmi";
// import { erc20Abi } from "wagmi/abi"; // wagmi 1.x
// import { erc20Abi } from 'wagmi';    // 方式一：wagmi >2.x
import { erc20Abi } from "viem";       // 方式二: 从 viem 导入 (推荐)

// USDT 合约地址
const USDT_ADDRESS = "0xe980e37De697598E0999D09B563e528be6E67316" as `0x${string}`;
// 要查询的地址
const TARGET_ADDRESS = "0xF427ae33E98d98B6bab36f068934b49845eD2168" as `0x${string}`;
/**
 *  erc20Abi 读取合约
 */
export function ReadContract() {
    // 使用 useReadContracts 批量读取合约数据
    const { data, isPending, error } = useReadContracts({
        contracts: [
            // 查询代币符号
            {
                address: USDT_ADDRESS,
                abi: erc20Abi,
                functionName: "symbol",
            },
            // 查询小数位精度
            {
                address: USDT_ADDRESS,
                abi: erc20Abi,
                functionName: "decimals",
            },
            // 查询总供应量
            {
                address: USDT_ADDRESS,
                abi: erc20Abi,
                functionName: "totalSupply",
            },
        ],
    });

    // 解构数据
    const [symbolResult, decimalsResult, supplyResult] = data || [];

    if (isPending) return <div className="p-4 text-center">加载中...</div>;
    if (error) return <div className="p-4 text-red-500">错误: {error.message}</div>;

    // 格式化数值 (USDT 的小数位是 6，不是常见的 18)
    const decimals = Number(decimalsResult?.result || 6);
    const formatValue = (value: bigint) => {
        return (Number(value) / Math.pow(10, decimals)).toLocaleString();
    };

    return (
    <div className = "border rounded-lg p-6 max-w-md mx-auto bg-white shadow-sm m-3 w-80" >
        <div className="grid grid-cols-2 gap-4">
            {/* 代币符号 */}
            <div className="space-y-1">
                <p className="text-sm text-gray-500">sysmbol</p>
                <p className="font-medium">{symbolResult?.result?.toString() || "USDT"}</p>
            </div>

            {/* 小数位精度 */}
            <div className="space-y-1">
                <p className="text-sm text-gray-500">decimals</p>
                <p className="font-medium">{decimalsResult?.result?.toString() || "6"}</p>
            </div>

            {/* 总供应量 */}
            <div className="space-y-1">
                <p className="text-sm text-gray-500">totalsupply</p>
                <p className="font-medium">
                    {supplyResult?.result ? formatValue(supplyResult.result) : "N/A"}
                </p>
            </div>
        </div>
    </div >
  );
}