import { BlobService } from '../shared/blob';
import { EtherService } from '../shared/ether';
import { Metadata, PinataService } from '../shared/pinata';

export class MintService {
    constructor(
        private readonly blobService: BlobService,
        private readonly etherService: EtherService,
        private readonly pinataService: PinataService
    ) {}
    async mint(name: string, image: File) {
        // blobに画像をアップロード
        const imageUrl = await this.blobService.upload(image);
        const metadata: Metadata = {
            name,
            image: imageUrl,
        };

        // ipfsにメタデータをアップロード
        const ipfsHash = await this.pinataService.upload(metadata);

        // ethereumにmint
        await this.etherService.safeMint(ipfsHash);
    }
}