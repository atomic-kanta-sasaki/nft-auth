# OSC北海道ハンズオン用スマートコントラクト

## 準備
Ethescan API Key: ethescanにSing up後APIを取得してください。スマートコントラクトのVerifyに使用します。
Alchemy API Key
Metamask
以下の.envファイルを作成して下さい。
```
WALLET_ADDRESS=
ALCHEMY_API_KEY=
SEPOLIA_PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

### スマートコントラクトデプロイ手順
1. ignitionを作成
2. `npx hardhat compile` でスマートコントラクトをコンパイル
3. `npx hardhat ignition deploy ignition/modules/{file name}} --network sepolia --verify` でSepoliaにデプロイ
