import { NftType, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {params}:{params: {contractAddress: string, tokenId: string}}
): Promise<NextResponse> {
    const prisma = new PrismaClient();
    const tokenId = Number(params.tokenId)
    const nft = await prisma.nft.findUniqueOrThrow({
      where: {
        tokenId_contractAddress: {
          tokenId,
          contractAddress: params.contractAddress
        }
      }
    })
    return NextResponse.json(nft)
}


export async function PUT(
  request: NextRequest,
  {params} : {params: {contractAddress: string, tokenId: string}}
): Promise<NextResponse> {
  const prisma = new PrismaClient()
  const tokenId = Number(params.tokenId)
  console.log(params.contractAddress)
  const { nftType } = await request.json()
  await prisma.nft.update({
    where: {
      tokenId_contractAddress: {
        tokenId,
        contractAddress: params.contractAddress
      }
    },
    data: {
      nftType
    }
  })
  return NextResponse.json('ok')
}