import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@components/Header/Header";
import InfoModal from "@components/InfoModal/InfoModal";
import Admin from "@pages/Admin/Admin";
import Collections from "@pages/Collections/Collections";
import Favorite from "@pages/Favorite/Favorite";
import Giveaways from "@pages/Giveaways/Giveaways";
import Profile from "@pages/Profile/Profile";
import { useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
import { useCreateSignature } from "@hooks/useCreateSignature";
import { selectUserData, setSignature, setWallet } from "@store/state/userSlice";
import { useGetSubscriptionStateQuery } from "@services/payment.api";
import { useAppSelector } from "@store/store.hook";

function RequireSubscriptionGuard({ children }: { children: JSX.Element }) {
  const { active } = useAppSelector(selectUserData);
  const redirectFunc = () => {
    return <InfoModal type="no-subscription" />;
  };
  return active ? children : redirectFunc();
}

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { account } = useEthers();
  const { signMessage } = useCreateSignature();
  const { refetch: getSubState } = useGetSubscriptionStateQuery();

  const askForSignature = useCallback(async () => {
    const userHasSignature = localStorage.getItem("sign");
    if (!userHasSignature) {
      const signResult = await signMessage();
      if (!signResult?.signature) {
        alert(
          "Please confirm the signature or you will not be able to use the application. Reload the page to request it again"
        );
      } else {
        const signature = signResult.signature;
        dispatch(setSignature(signature));
        localStorage.setItem("sign", JSON.stringify(signature));
        getSubState();
      }
    }
  }, [dispatch, getSubState, signMessage]);

  useEffect(() => {
    if (account) {
      dispatch(setWallet(account));
      askForSignature();
    }
  }, [account, askForSignature, dispatch]);

  return (
    <div className="App">
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Collections />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route
            path="/giveaways"
            element={
              <RequireSubscriptionGuard>
                <Giveaways />
              </RequireSubscriptionGuard>
            }
          />
          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
