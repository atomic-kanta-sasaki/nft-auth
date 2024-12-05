'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type NftList = {
  tokenId: number,
  contractAddress: string,
  ownerAddress: string,
  nftType: string
}

export default function NftList() {
  const [data, setData] = useState<NftList[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = async() => {
      const res = await axios.get('/api/nft/list')
      console.log(res.data)
      setData(res.data);
    }
    data()
  }, [])

  const handleClick = (contractAddress: string, tokenId: number) => {
    router.push(`/nft/${contractAddress}/${tokenId}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">TokenId</TableCell>
            <TableCell align="right">Contract Address</TableCell>
            <TableCell align="right">NFT Type</TableCell>
            <TableCell align="right">Owner Addres</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={`${row.tokenId}-${row.contractAddress}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleClick(row.contractAddress, row.tokenId)}
            >
              <TableCell align="right">{row.tokenId}</TableCell>
              <TableCell align="right">{row.contractAddress}</TableCell>
              <TableCell align="right">{row.nftType}</TableCell>
              <TableCell align="right">{row.ownerAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}