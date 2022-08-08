import { useEthers } from "@usedapp/core";
import { useCallback } from "react";

const message = process.env.REACT_APP_SIGNATURE_MESSAGE;

export const useCreateSignature = () => {
  const { library, account } = useEthers();

  const signMessage = useCallback(async () => {
    console.log(library);
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
      console.log(err);
    }
  }, [account]);

  return { signMessage };
};
