import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    
    // request bodyとかに署名をもらう
    // 署名データをbase64とかでエンコードするとか？

    // 署名の検証を行う
    // 検証結果からEOAアドレスを取得する

    // EOAアドレスから認証対処のNFTを持っているかどうか判定

    // 持っていれば認証成功
    // 持っていなければ認証失敗
    
    return NextResponse.json("authrizaton")
}

