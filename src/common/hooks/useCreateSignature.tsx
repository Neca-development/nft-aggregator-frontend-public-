import { useEthers } from "@usedapp/core";
import { useCallback } from "react";

const message = process.env.REACT_APP_SIGNATURE_MESSAGE;

export const useCreateSignature = () => {
  const { library, account } = useEthers();

  const signMessage = useCallback(async () => {
    try {
      const signer = library.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        message,
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
