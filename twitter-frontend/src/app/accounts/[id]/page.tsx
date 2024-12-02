"use client";

import Cookies from "js-cookie";

const UserPage = () => {
  const signedIn = Cookies.get("signedIn");
  if (signedIn !== "true") {
    window.location.href = "/";
    return <p>リダイレクト中...</p>;
  }

  const handleClick = () => {
    Cookies.remove("signedIn");
    window.location.href = "/";
  };

  return (
    <>
      <p>ログイン完了</p>
      <button onClick={handleClick} className="border border-black">
        ログアウト
      </button>
    </>
  );
};

export default UserPage;
