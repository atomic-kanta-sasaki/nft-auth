import PinataClient, { PinataPinOptions } from "@pinata/sdk";
import { v4 as uuidv4 } from 'uuid';

export type Metadata = {
    name: string;
    image: string;
};

export class PinataService {
    private readonly pinata: PinataClient;
    constructor() {
        this.pinata = new PinataClient(
            process.env.PINATA_API_KEY,
            process.env.PINATA_API_SECRET
        );
    }

    async upload(metadata: Metadata): Promise<string> {
        const pinataOptions: PinataPinOptions = {
            pinataMetadata: {
                name: uuidv4(),
            },
        };
        const res = await this.pinata.pinJSONToIPFS(metadata, pinataOptions);
        return res.IpfsHash;
    }
}