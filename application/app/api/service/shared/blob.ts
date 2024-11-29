import { BlobServiceClient, BlockBlobUploadOptions, StorageSharedKeyCredential, ContainerClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

export class BlobService {
    private readonly containerClient: ContainerClient;
    constructor() {
         // Enter your storage account name and shared key
        const account = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
        const containerName = process.env.AZURE_STORAGE_CONTAONER_NAME!;
        if (!account || !accountKey || !containerName) {
            throw new Error('Azure storage account information is missing from environment variables');
        }

        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net`,
            sharedKeyCredential
        );

        // コンテナの作成
        this.containerClient = blobServiceClient.getContainerClient(containerName);
    }

    async upload(file: File): Promise<string> {
        const options: BlockBlobUploadOptions = {
            blobHTTPHeaders: {
                blobContentType: 'image/jpeg',
            },
        };

        const fileName = await this.createFileName(file.name);
        const arrayBuffer = await file.arrayBuffer();

        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        try {
            const uploadBlobResponse = await blockBlobClient.upload(arrayBuffer, arrayBuffer.byteLength, options);

            console.log(`Upload block blob ${fileName} successfully`, uploadBlobResponse.requestId);
            return blockBlobClient.url;
        } catch (error) {
            throw error;
        }
    }

    private async createFileName(fileName: string): Promise<string> {
        const exif = fileName.split('.').pop();
        return `${uuidv4()}.${exif}`;
    }
}
