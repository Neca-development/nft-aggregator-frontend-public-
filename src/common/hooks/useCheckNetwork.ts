import { Mainnet, Rinkeby, useEthers } from "@usedapp/core";

const env = process.env.NODE_ENV;

const useCheckNetwork = () => {
  const { chainId } = useEthers();

  const checkNetwork = async () => {
    if (env === "development" && chainId !== Rinkeby.chainId) {
      try {
        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      } catch (error) {
        alert(`Please switch your network to ${Rinkeby.chainName}`);
      }
    } else if (env === "production" && chainId !== Mainnet.chainId) {
      try {
        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
      } catch (error) {
        alert(`Please switch your network to ${Mainnet.chainName}`);
      }
    }
  };

  return { checkNetwork };
};

export default useCheckNetwork;
