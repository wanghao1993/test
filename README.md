# 目标完成一个dapp

## 使用nextjs框架

## css使用tailwindcss

## 钱包使用metamask

## 钱包管理使用rainbowTookit

## UI组件库是shadcn/ui

## 合约交互使用wagmi

网络是：sepolia

合约地址是：0xe980e37De697598E0999D09B563e528be6E67316
1. 需要实现的功能是连接钱包
2. 页面上有个按钮获取合约代币的的totalsupply,sysmbol,decimals

## ERC20标准是什么
ERC20通过定义一组标准接口，使代币能够在钱包、交易所和去中心化应用（DApps）中无缝交互

ERC20标准（同质化 Tokens）要求代币合约必须必须实现的6个函数和2个事件:
函数​	
    balanceOf()	查询指定地址的代币余额 
    transfer()	从调用者地址向目标地址转移代币 
    transferFrom()	允许第三方（如合约）从授权地址转移代币 
    approve()	授权其他地址使用一定数量的代币 
    allowance()	查询授权额度 
    totalSupply()	返回代币总供应量 

​事件​	
    Transfer	代币转账时触发（包括零转账） 
    Approval	授权操作时触发 

可选接口​（建议实现）：
    name()：代币名称（如 "USD Coin"）
    symbol()：代币符号（如 "USDC"）
    decimals()：小数位数（通常为18，1代币 = 10¹⁸最小单位）
