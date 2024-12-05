import { PrismaClient, NftType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// NFTのTypeを変更する
export async function POST(request: NextRequest): Promise<NextResponse> {
    const prisma = new PrismaClient()
    const { tokenId, contractAddress, nftType } = await request.json();
    // Prisma Enum の値リストを取得
    const validNftTypes = Object.values(NftType);

    // リクエストの nftType を検証
    if (!validNftTypes.includes(nftType)) {
        throw new Error(`Invalid nftType: ${nftType}`);
    }

    try {
        await prisma.nft.update({
            where: {
                tokenId_contractAddress: {
                    tokenId,
                    contractAddress
                }
            },
            data: {
                nftType
            }
        })
    
        return NextResponse.json("ok")
    } catch(e) {
        return NextResponse.json(e)
    }
    
}