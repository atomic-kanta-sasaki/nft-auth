"use client";

import { BrowserProvider } from "ethers";
import { useState } from "react";
import { SiweMessage } from "siwe";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  const [verifiedAddress, setVerifiedAddress] = useState("");

  const signInWithEthereum = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const domain = window.location.host;

    const signer = await provider.getSigner();

    const nonceResponse = await fetch("/api/nonce", {
      method: "POST",
    });
    const { nonce } = await nonceResponse.json();

    const message = new SiweMessage({
      domain,
      address: signer.address,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce,
    });
    const preparedMessage = message.prepareMessage();
    const signature = await signer.signMessage(preparedMessage);

    const verifyResponse = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: preparedMessage, signature, nonce }),
    });
    const { address } = await verifyResponse.json();
    setVerifiedAddress(address);
  };

  return (
    <>
      <button onClick={signInWithEthereum}>Sign-in with Ethereum</button>
      <p>VerifiedAddress: {verifiedAddress}</p>
    </>
  );
}