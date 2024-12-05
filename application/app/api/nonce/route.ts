import { NextResponse } from "next/server";
import { generateNonce } from "siwe";
import { PrismaClient } from '@prisma/client'

export async function POST() {
  const prisma = new PrismaClient();
  const nonce = generateNonce();
  const now = new Date();
  await prisma.nonce.create({
    data: {
      nonce,
      ExpirationTime: new Date(now.setMinutes(now.getMinutes() + 5)) 
    }
  })

  return NextResponse.json({ nonce });
}