# OSC北海道ハンズオン用NFTアプリケーション


## 準備
Azure Blob Storage: NFTの画像保存用に使用します。
Pinata: NFTのメタデータを保存するIPFS
Alchemy: Ethereum Nodeとして使用します。
Metamask: Transactionの署名に使用します。
Smart Contract: NFT発行のためのスマートコントラクト。osc-nft-demo-contractでコントラクトをデプロイ後に出力されるコントラクトアドレスを使用します。

以下の内容を.envファイルとして保存してください。
```
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCOUNT_KEY=
AZURE_STORAGE_CONTAONER_NAME= 
PINATA_API_KEY=
PINATA_API_SECRET=
ALCHEMY_API_KEY=
METAMASK_EOA_ADDRESS=
METAMASK_PRIVATE_KEY=
CONTRACT_ADDRESS=
ETH_NETWORK="sepolia"
```

## 起動

アプリケーションサーバーの起動
```bash
npm run dev
```