import React from "react";
import { useNavigate } from "react-router-dom";

import InfoModal from "@components/InfoModal/InfoModal";
import { selectUserData } from "@store/state/userSlice";
import { useAppSelector } from "@store/store.hook";

function RequireSubscriptionGuard({ children }: { children: JSX.Element }) {
  const { active } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const redirectFunc = () => {
    return <InfoModal type="no-subscription" onClose={() => navigate("/profile")} isOpen={true} />;
  };
  return active ? children : redirectFunc();
}

export default RequireSubscriptionGuard;
