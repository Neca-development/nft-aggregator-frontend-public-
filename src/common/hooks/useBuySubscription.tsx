import { useSendTransaction } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useRef } from "react";

import {
  useLazyGetSubscriptionStateQuery,
  useSendTransactionHashMutation,
} from "@services/payment.api";
import { setTransactionStatus } from "@store/state/userSlice";
import { useAppDispatch } from "@store/store.hook";
import { TransactionState } from "@models/payment.interface";

const useBuySubscription = () => {
  const { sendTransaction, state: transactionStatus } = useSendTransaction();
  const [sendTransactionHash] = useSendTransactionHashMutation();
  const [getSubscriptionState] = useLazyGetSubscriptionStateQuery();
  const dispatch = useAppDispatch();
  const timer = useRef(null);

  const buySubscription = () => {
    sendTransaction({
      to: "0xd771008E6f496317De65aa7D56701F9383fa6a07",
      value: utils.parseEther("0.02"),
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
        timer.current = setTimeout(() => {
          getSubscriptionState();
          dispatch(setTransactionStatus(TransactionState.success));
        }, 10000);
        break;
      case "Exception":
      case "Fail":
        dispatch(setTransactionStatus(TransactionState.failed));
        break;
      default:
      case "None":
        dispatch(setTransactionStatus(TransactionState.unknown));
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [dispatch, getSubscriptionState, sendTransactionHash, transactionStatus]);

  return { buySubscription };
};

export default useBuySubscription;
