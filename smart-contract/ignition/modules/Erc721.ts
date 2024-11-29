import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const Erc721Module = buildModule("Erc721", (m) => {

  const erc721 = m.contract("Erc721", [process.env.WALLET_ADDRESS!]);

  return { erc721 };
});

export default Erc721Module;
