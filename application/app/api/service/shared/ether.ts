import { ethers, Contract } from "ethers";
import { erc721Abi } from '../../abi/erc721';

export class EtherService {
  private readonly contract: Contract;
  private readonly eoaAddress: string
  constructor() {
    const provider = new ethers.AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_API_KEY!);
    const wallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY!, provider);
    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, erc721Abi, wallet);
    this.eoaAddress = process.env.METAMASK_EOA_ADDRESS!
  }

  async safeMint(tokenURI: string) {
    const tx = await this.contract.safeMint(this.eoaAddress, tokenURI);
    await tx.wait();
  }
}