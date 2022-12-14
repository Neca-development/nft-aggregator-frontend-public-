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

import useCheckNetwork from "./useCheckNetwork";

const transactionReceiver = process.env.REACT_APP_TRANSACTION_RECEIVER_ADDRESS;

const useBuySubscription = () => {
  const { sendTransaction, state: transactionStatus } = useSendTransaction();
  const [sendTransactionHash] = useSendTransactionHashMutation();
  const [getSubscriptionState] = useLazyGetSubscriptionStateQuery();
  const dispatch = useAppDispatch();
  const timer = useRef(null);
  const { checkNetwork } = useCheckNetwork();

  const buySubscription = async () => {
    await checkNetwork();
    sendTransaction({
      to: transactionReceiver,
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
        }, 15000);
        break;
      case "Exception":
      case "Fail":
        dispatch(setTransactionStatus(TransactionState.failed));
        break;
      default:
      case "None":
        dispatch(setTransactionStatus(TransactionState.null));
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [dispatch, getSubscriptionState, sendTransactionHash, transactionStatus]);

  return { buySubscription };
};

export default useBuySubscription;
