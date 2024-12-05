'use client'

export default function Nft({params}:{params: {contractAddres: string, tokenId: string}}) {

  return (<>nft {params.contractAddres} {params.tokenId}</>)
}