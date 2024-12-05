import { PrismaClient, NftType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// システムで管理したいNFTを登録する
export async function POST(req: NextRequest): Promise<NextResponse> {
    const prisma = new PrismaClient();
    const { tokenId, contractAddress, nftType } =  await req.json();
    // Prisma Enum の値リストを取得
    const validNftTypes = Object.values(NftType);

    // リクエストの nftType を検証
    if (!validNftTypes.includes(nftType)) {
        throw new Error(`Invalid nftType: ${nftType}`);
    }

    await prisma.nft.create({
     data: {
        tokenId,
        contractAddress,
        nftType
     }
    })
    
    return NextResponse.json('ok')
}