import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function POST(request: Request) {
  const prisma  = new PrismaClient();
  const { message, signature, nonce } = await request.json();
  const siweMessage = new SiweMessage(message);

  const domain = "localhost:3000";

  try {
    await prisma.nonce.findFirstOrThrow({
      where: {
        nonce,
        ExpirationTime: {
          gte: new Date()
        }
      }
    })

    // 使用ずみnonceの削除
    await prisma.nonce.delete({
      where: {
        nonce: nonce,
      }
    })
    // 期限切れnonceの削除
    await prisma.nonce.deleteMany({
      where: {
        ExpirationTime: {
          lt: new Date()
        }
      }
    })

    const result = await siweMessage.verify({ signature, domain, nonce });

    if (!result.success) {
      return NextResponse.json({ error: "TODO: エラー" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        eoa: {
          some: {
            address: result.data.address
          }
        }
      }
    })

    if(user) {
      return NextResponse.json({message: 'すでに登録済みのユーザーです'}, {status: 200})
    }

    prisma.$transaction(async(tx) => {
      const user = await  tx.user.create({data:{}})
      await tx.eoa.create({
        data: {
          address: result.data.address,
          userId: user.id
        }
      })
    })

    return NextResponse.json(result.data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "TODO: エラー" }, { status: 401 });
  }
}