const originUrl = new URL("http://127.0.0.1:8000/api/manage_user/");

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

export const passwordCorrect = async (login_info, password) => {
  const user = await getUser();
  let correct = false;
  if (user.length > 0) {
    for (let u of user) {
      if (
        u.username === login_info ||
        u.email === login_info ||
        u.phone.replace(/-/g, "") === login_info.replace(/-/g, "")
      ) {
        if (u.password === password) {
          correct = true;
          break;
        }
      }
    }
  }

  return correct;
};
