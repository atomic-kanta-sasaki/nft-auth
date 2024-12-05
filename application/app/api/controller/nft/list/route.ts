import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(request: NextRequest): Promise<NextResponse> {
  const prisma = new PrismaClient();
  const nft = await prisma.nft.findMany();

  return NextResponse.json(nft)
}