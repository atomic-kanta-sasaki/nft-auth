'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { NftType } from "@prisma/client";
import { Button } from '@mui/material';

type Nft = {
  tokenId: number;
  contractAddress: string;
  ownerAddress: string;
  nftType: NftType;
};

export default function Nft({ params }: { params: { contractAddres: string; tokenId: string } }) {
  const [nft, setNft] = useState<Nft | null>(null);
  const [nftType, setNftType] = useState<NftType | "">("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/nft/${params.contractAddres}/${params.tokenId}`);
        setNft(res.data);
        setNftType(res.data.nftType || ""); // デフォルト値を使用
      } catch (error) {
        console.error("Failed to fetch NFT data:", error);
      }
    };
    fetchData();
  }, [params]);

  const handleNftType = (e: SelectChangeEvent<NftType>) => {
    const value = e.target.value as NftType;
    if (Object.values(NftType).includes(value)) {
      setNftType(value);
    } else {
      console.error("Invalid NftType:", value);
    }
  };

  const handleSubmit = () => {
    axios.put(`/api/nft/${params.contractAddres}/${params.tokenId}`, { nftType: nftType })
  }

  return (
    <>    
      {!nft ? (
        <>Loading</>
      ) : (
        <>
          <div>contract addres: {nft?.contractAddress}</div>
          <div>tokenId: {nft?.tokenId}</div>
          <div>owner: {nft?.ownerAddress}</div>
          <FormControl fullWidth>
            <Select
              labelId="nft type label"
              value={nftType || ""}
              onChange={handleNftType}
            >
              {Object.values(NftType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <Button onClick={handleSubmit}>更新</Button>
    </>
  );
}
