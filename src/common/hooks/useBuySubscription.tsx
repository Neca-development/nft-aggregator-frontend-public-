import { TransactionState } from "@models/payment.interface";
import { useSendTransactionHashMutation } from "@services/payment.api";
import { setTransactionStatus } from "@store/state/userSlice";
import { useAppDispatch } from "@store/store.hook";
import { useSendTransaction } from "@usedapp/core";
import { useEffect } from "react";

const useBuySubscription = () => {
  const { sendTransaction, state: transactionStatus } = useSendTransaction();
  const [sendTransactionHash] = useSendTransactionHashMutation();
  const dispatch = useAppDispatch();

  const buySubscription = () => {
    sendTransaction({
      to: "0xd771008E6f496317De65aa7D56701F9383fa6a07",
      value: 1,
    });
  };

  useEffect(() => {
    switch (transactionStatus.status) {
      case "PendingSignature":
        dispatch(setTransactionStatus(TransactionState.pending));
        break;
      case "Mining":
        sendTransactionHash(transactionStatus.transaction.hash);
        break;
      case "Success":
        dispatch(setTransactionStatus(TransactionState.success));
        break;
      case "Exception":
      case "Fail":
        dispatch(setTransactionStatus(TransactionState.failed));
        break;
      // default:
      // case "None":
      //   dispatch(setTransactionStatus(TransactionState.none));
    }
  }, [dispatch, sendTransactionHash, transactionStatus]);

  return { buySubscription };
};

export default useBuySubscription;
