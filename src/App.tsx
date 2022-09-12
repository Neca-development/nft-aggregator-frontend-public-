import { useEthers } from "@usedapp/core";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "@components/Header/Header";
import InfoModal from "@components/InfoModal/InfoModal";
import useBuySubscription from "@hooks/useBuySubscription";
import useCheckNetwork from "@hooks/useCheckNetwork";
import { useCreateSignature } from "@hooks/useCreateSignature";
import Admin from "@pages/Admin/Admin";
import Collections from "@pages/Collections/Collections";
import Favorite from "@pages/Favorite/Favorite";
import Giveaways from "@pages/Giveaways/Giveaways";
import Profile from "@pages/Profile/Profile";
import { clearUserState, setFavoritesNumber } from "@store/state/userSlice";
import { useGetSubscriptionStateQuery } from "@services/payment.api";
import RequireSubscriptionGuard from "@pages/RequireSubscriptionGuard";
import { userHasSignature } from "@utils/utils";
import { useLazyGetUserFavoritesQuery } from "@services/users.api";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { account, deactivate } = useEthers();
  const { signMessage } = useCreateSignature();
  const { checkNetwork } = useCheckNetwork();
  const { buySubscription } = useBuySubscription();

  const { refetch: getSubState, error: loginError } = useGetSubscriptionStateQuery(null, {
    skip: !account,
  });
  const [getUserFavorites] = useLazyGetUserFavoritesQuery();

  const [showNoSignModal, setShowNoSignModal] = useState(false);

  useEffect(() => {
    const askForSignature = async () => {
      const signResult = await signMessage();
      if (!signResult?.signature) {
        deactivate();
        dispatch(clearUserState());
        setShowNoSignModal(true);
      } else {
        const signature = signResult.signature;
        const timestamp = signResult.timestamp;
        const agAuth = { signature, timestamp };
        localStorage.setItem("agAuth", JSON.stringify(agAuth));
        getSubState();
      }
    };

    const requestUserFavoritesNumber = async () => {
      const resp = await getUserFavorites({ page: 0 }).unwrap();
      const favNumber = resp.items.length;
      dispatch(setFavoritesNumber(favNumber));
    };

    if (account) {
      checkNetwork();

      if (userHasSignature() === false && !loginError) {
        askForSignature();
      }

      // @ts-ignore
      if (userHasSignature() && (loginError?.status === 401 || loginError?.status === 403)) {
        askForSignature();
      }

      requestUserFavoritesNumber();
    }
  }, [
    account,
    checkNetwork,
    deactivate,
    dispatch,
    getSubState,
    getUserFavorites,
    loginError,
    signMessage,
  ]);

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
          <Route path="/profile" element={<Profile buySubscription={buySubscription} />} />

          {/* <Route path="/admin" element={<Admin />} /> */}

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </AnimatePresence>

      <InfoModal
        type="no-signature"
        onClose={() => setShowNoSignModal(false)}
        isOpen={showNoSignModal}
      />
    </div>
  );
}

export default App;
