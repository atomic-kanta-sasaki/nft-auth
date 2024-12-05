'use client'

import { ChangeEvent, useState } from "react"
import { NftType } from "@prisma/client";
import { TextField, SelectChangeEvent } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import axios from "axios";


export default function NftRegister() {
    const [tokenId, setTokenId] = useState(0);
    const [contractAddress, setContractAddres] = useState('');
    const [nftType, setNftType] = useState<NftType>('BASIC');
    const handleTokenId = (e: ChangeEvent<HTMLInputElement>) => {
        setTokenId(Number(e.target.value));
    }

    const handleContractAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setContractAddres(e.target.value);
    }

    const handleNftType = (e: SelectChangeEvent<NftType>) => {
        const value = e.target.value as NftType;
        if (Object.values(NftType).includes(value)) {
            setNftType(value);
        } else {
            console.error('Invalid NftType:', value);
        }
    }

    const handleSubmit = async() => {
        try {
            await axios.post('/api/nft/register', {
                tokenId,
                contractAddress,
                nftType
            })
        } catch(e) {
            console.error(e)
        }
        
    }

    return (
      <div>
        <TextField fullWidth label="nft token id" onChange={handleTokenId} />
        <TextField fullWidth label="nft contract address" onChange={handleContractAddress} />
        <FormControl fullWidth>
          <Select 
            labelId="nft type label"
            value={nftType}
            onChange={handleNftType}
          >
            {Object.values(NftType).map((type) => (
                <MenuItem key={type} value={type}>
                    {type}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSubmit}>NFTの登録</Button>
      </div>
    )
}