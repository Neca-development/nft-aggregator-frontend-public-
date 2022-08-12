import { useEthers } from "@usedapp/core";
import { useCallback } from "react";

export const useCreateSignature = () => {
  const { library, account } = useEthers();

  const signMessage = useCallback(async () => {
    try {
      const timestamp = Date.now().toString();
      const signer = library.getSigner();
      const signature = await signer.signMessage(timestamp);
      const address = await signer.getAddress();

      return {
        timestamp,
        signature,
        address,
      };
    } catch (err) {
      console.log(err.message);
      return { error: err.message };
    }
  }, [account]);

  return { signMessage };
};
