import { Mainnet, Rinkeby, useEthers } from "@usedapp/core";
import { useCallback } from "react";

const env = process.env.NODE_ENV;

const useCheckNetwork = () => {
  const { chainId } = useEthers();

  const checkNetwork = useCallback(async () => {
    if (!chainId) {
      return;
    }
    if (env === "development" && chainId !== Rinkeby.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      } catch (error) {
        alert(`Please switch your network to ${Rinkeby.chainName}`);
      }
    } else if (env === "production" && chainId !== Mainnet.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
      } catch (error) {
        alert(`Please switch your network to ${Mainnet.chainName}`);
      }
    }
  }, [chainId]);

  return { checkNetwork };
};

export default useCheckNetwork;
