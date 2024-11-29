import { NextRequest, NextResponse } from 'next/server';
import { MintService } from '../../service/nft/mint';
import { BlobService } from '../../service/shared/blob';
import { PinataService } from '../../service/shared/pinata';
import { EtherService } from '../../service/shared/ether';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData();
  const imageFile = formData.get('image') as File;

  const mintService = new MintService(
    new BlobService(),
    new EtherService(),
    new PinataService()
  );

  await mintService.mint(formData.get('name') as string, imageFile);
  
  return NextResponse.json({
    message: 'Minting Success!!',
  })
}