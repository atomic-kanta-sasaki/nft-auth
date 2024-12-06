import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
  // EOAが対象のNFTを持っているかどうか確認
  const eoaList = user?.eoa.map(e => e.address);

  if(!eoaList || eoaList?.length === 0) {
    NextResponse.json(          
      { error: "Unauthorized: No linked EOA found" },
      { status: 401 }
    )
  }

  // EOAアドレスから認証対処のNFTを持っているかどうか判定

  // 持っていれば認証成功
  // 持っていなければ認証失敗
  
  return NextResponse.json("authrizaton")
}

