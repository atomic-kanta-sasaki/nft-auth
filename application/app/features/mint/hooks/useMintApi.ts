import axios from "axios";

type MintPayload = {
  name?: string;
  image?: File;
}

export type MintActions = {
  mint: (payload: MintPayload) => void;
}

export const useMintApi = () => {
  const mint = async (payload: MintPayload) => {
    const formData = new FormData();
    if(payload.image) {
      formData.append('image', payload.image);
    }
    if (payload.name) {
      formData.append('name', payload.name);
    }
    try {
      const res = await axios.post('/api/nft', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    mint
  }
}