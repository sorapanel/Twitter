const originUrl = new URL("http://backend.local/api/manage_user/");

//すべてのユーザー取得
export const getUser = () => {
  const url = new URL("/api/manage_user/", originUrl);
  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch(() => reject([]));
  });
};

//毎回API呼び出しは処理効率上問題、何か手はないか...

/*
 *引き数で与えたユーザーネームがデータベース上に存在しているか
 * @param username:ユーザーネーム
 * @return boolean:存在している→true,該当なし→false
 */
export const usernameExist = async (username) => {
  const user = await getUser();
  let isExist = false;
  if (user.length > 0) {
    user.map((u) => {
      if (u.username == username) {
        isExist = true;
      }
    });
    if (isExist) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/*
 *引き数で与えたメールアドレスがデータベース上に存在しているか
 * @param username:メールアドレス
 * @return boolean:存在している→true,該当なし→false
 */
export const emailExist = async (email) => {
  const user = await getUser();
  let isExist = false;
  if (user.length > 0) {
    user.map((u) => {
      if (u.email == email) {
        isExist = true;
      }
    });
    if (isExist) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/*
 *引き数で与えた電話番号がデータベース上に存在しているか
 * @param username:電話番号(string)
 * @return boolean:存在している→true,該当なし→false
 */
export const phoneExist = async (phone) => {
  const user = await getUser();

  let isExist = false;
  if (user.length > 0) {
    user.map((u) => {
      if (u.phone_num.replace(/-/g, "") === phone.replace(/-/g, "")) {
        isExist = true;
      }
    });
    if (isExist) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//パスワードの暗号化が必要　←のちに修正する

/*
 *引き数で与えたログイン情報からユーザを特定してパスワードが正しいか検証する
 *@param login_info:ログイン情報(username or email or phonenumber)
 *@return correct: パスワードが存在する→true, 該当なし←false
 */
export const passwordCorrect = async (login_info, password) => {
  const user = await getUser();
  const CryptoJS = require("crypto-js");
  const secretKey = "skySecretKey"; //デプロイするときは絶対に隠す!!
  if (user.length > 0) {
    for (let u of user) {
      if (u.phone) {
        if (u.phone.includes("-")) {
          u.phone = u.phone.replace(/-/g, "");
        }
      }
      if (
        u.username === login_info ||
        u.email === login_info ||
        u.phone === login_info.replace(/-/g, "")
      ) {
        const decryptedPassword = CryptoJS.AES.decrypt(
          u.password,
          secretKey
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === password) {
          return u;
        }
      }
    }
  }

  return null;
};

export const createUser = (
  username,
  name,
  email,
  phone_num,
  profile_image,
  password,
  month,
  day,
  year
) => {
  const url = new URL("/api/manage_user/", originUrl);
  month = month.replace("月", "");
  let date = year + "-" + month + "-" + day;
  const secretKey = "skySecretKey"; //デプロイするときは絶対に隠す!!
  const CryptoJS = require("crypto-js");

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    secretKey
  ).toString();

  //画像ファイルを送信するため今回はformData作成
  const formData = new FormData();
  formData.append("username", username);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone_num", phone_num);
  if (profile_image instanceof File) {
    formData.append("profile_image", profile_image);
  }
  formData.append("password", encryptedPassword);
  formData.append("birth_date", date);

  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            const message = errorData?.message || `Unexpected error response`;
            throw new Error(
              `HTTP error! status: ${res.status}, message: ${message}`
            );
          });
        }
        return res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error("Error in createUser:", error);
        alert("処理中にエラーが発生しました。もう一度やり直してください。");
        resolve(null);
      });
  });
};
