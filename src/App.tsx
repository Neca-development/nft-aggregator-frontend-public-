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
import { setWallet } from "@store/state/userSlice";

// maybe rewrite later
function RequireSubscriptionGuard({ children }: { children: React.ReactNode }) {
  const tempHasSubs = false;
  const redirectFunc = () => {
    return <InfoModal type="no-subscription" />;
  };
  return tempHasSubs ? children : redirectFunc();
}

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { account } = useEthers();
  const { signMessage } = useCreateSignature();

  const askForSignature = useCallback(async () => {
    const userHasSignature = localStorage.getItem("sign");
    if (!userHasSignature) {
      const signResult = await signMessage();
      if (!signResult?.signature) {
        alert(
          "Please confirm the signature or you will not be able to use the application. Reload the page to request it again"
        );
      } else {
        localStorage.setItem("sign", JSON.stringify(signResult.signature));
      }
    }
  }, [signMessage]);

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
          <Route path="/giveaways" element={<Giveaways />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
