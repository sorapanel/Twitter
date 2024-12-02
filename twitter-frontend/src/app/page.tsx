"use client";

import AccountPageContainer from "@/containers/AccountPageContainer";
import Cookies from "js-cookie";

const AccountPage = () => {
  const handleSignup = () => {
    window.location.href = "/";
  };

  const handleLogin = (id: number | string) => {
    Cookies.set("signedIn", "true");
    window.location.href = `/accounts/${id}`;
  };

  return (
    <AccountPageContainer
      handleSignup={handleSignup}
      handleLogin={handleLogin}
    />
  );
};

export default AccountPage;
