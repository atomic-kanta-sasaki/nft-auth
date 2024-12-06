import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


// types/nft.ts

export interface NFT {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  image_url: string;
}

export interface MyNFT {
  tokenId: number;
  contractAddress: string;
  ownerAddress: string | null;
  nftType: string;
}


export async function POST(reqest: NextRequest): Promise<NextResponse> {
  // ほんとはこのシステム固有の識別子ではなく、連携先と共有しているemailとかがいいけど、今カラムがないのでいったんUserIdを使用
  const { userId } = await reqest.json();
  const prisma = new PrismaClient();
  
  // 認証対象のユーザー情報の確認(認証用のJWTとかで良い)
  // ユーザーの登録済みのEOAを確認
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      eoa: true
    }
  })
  // userがEOAを持っているか確認
  const eoaList = user?.eoa.map(e => e.address);

  if(!eoaList || eoaList?.length === 0) {
    NextResponse.json(          
      { error: "Unauthorized: No linked EOA found" },
      { status: 401 }
    )
  }

  // 認証対象のNFTを取得
  const nftAuth = await prisma.nft.findMany();


  // EOAアドレスから認証対処のNFTを持っているかどうか判定
  // いったんopenseaからEOAが所有しているNFTの一覧を取得する
  const nftPromises = eoaList
  ? eoaList.flatMap(async (e) => {
      const res = await axios.get(
        `https://${process.env.OPENSEA_API_HOST_NAME}/api/v2/chain/${process.env.OPENSEA_CHAIN_ID}/account/${e}/nfts`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": process.env.OPENSEA_API_KEY!,
          }
        }
      );
      return res.data.nfts;
    })
  : [];

  const nftData = await Promise.all(nftPromises)

  if (!nftData) { 
    NextResponse.json(          
      { error: "Unauthorized: No linked EOA found" },
      { status: 401 }
    )
  }
  const flattenedNftData = nftData.flat().filter(nft => nft.identifier);
  console.log('===================================================')
  console.log(flattenedNftData)
  console.log('===================================================')

  // Map the raw data to NFT type
  const nftArray: NFT[] | undefined = flattenedNftData.map((nft: any) => ({
    identifier: nft.identifier,
    collection: nft.collection,
    contract: nft.contract,
    token_standard: nft.token_standard,
    name: nft.name || "",
    image_url: nft.image_url || "",
  }));

  const results = compareNfts(nftAuth, nftArray);
  
  return NextResponse.json(results)
}

/**
 * Compares two sets of NFTs and determines if there are matches based on tokenId and contract address.
 * @param mynft - Array of MyNFT objects
 * @param nfts - Array of NFT objects
 * @returns An array of MyNFT objects with an additional isMatch property
 */
export const compareNfts = (mynft: MyNFT[], nfts: NFT[] | undefined) => {

  return mynft.map((myNft) => {
    const match = nfts?.find(
      (nft) =>
        nft.identifier === myNft.tokenId.toString() &&
        nft.contract.toLowerCase() === myNft.contractAddress.toLowerCase()
    );
    return {
      ...myNft,
      isMatch: !!match, 
    };
  });
};