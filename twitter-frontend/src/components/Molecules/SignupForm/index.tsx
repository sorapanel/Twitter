import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/Atoms/Logo";
import TextBox from "@/components/Atoms/TextBox";
import { useState, useRef, useEffect } from "react";
import DateBox from "@/components/Atoms/DateBox";
import Button from "@/components/Atoms/Button";
import ShapeImage from "@/components/Atoms/ShapeImage";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { usernameExist } from "@/common/api/manage_user";

const SignupForm = () => {
  //電話番号とメールの入力切替を管理
  const [isPhoneNum, setIsPhoneNum] = useState(true);
  //それぞれのフォームの入力状態を管理
  //すべて（電話番号とメールはどちらか）を入力しないと次へは進めない
  const [isName, setIsName] = useState(false);
  const [isPhoneNumOrEmail, setIsPhoneNumOrEmail] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [isDay, setIsDay] = useState(false);
  const [isYear, setIsYear] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isUsername, setIsUsername] = useState(false);

  //ダミーインプット管理用
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  //ダミーフォーム送信用
  const formRef = useRef<HTMLFormElement>(null);

  //次へボタンが押された？
  const [isNext, setIsNext] = useState(false);
  //登録するボタンが押された？
  const [isRegister, setIsRegister] = useState(false);
  //写真選択ボタンが押された？
  const [isPhoto, setIsPhoto] = useState(false);
  //プロフィール画像設定完了（何もしない場合デフォルト画像）判定用
  const [isSetProfileImage, setIsSetProfileImage] = useState(false);

  //バリデーションエラーでないか？
  const [hasErrorPhone, setHasErrorPhone] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorPassword, setHasErrorPassword] = useState(false);
  const [hasErrorUsername, setHasErrorUsername] = useState(false);

  //動的ShapeImageのURL作成用
  const [shapeImageURL, setShapeImageURL] = useState<string>("");

  //電話番号とメールを切り替える
  const handlePhoneNumOrEmail = () => {
    setIsPhoneNum(!isPhoneNum);
    setIsPhoneNumOrEmail(false);
  };

  //次へボタンが押された時の処理
  const handleNextButtonClick = () => {
    setIsNext(!isNext);
  };

  //登録するボタンが押された時の処理
  const handleRegisterClick = () => {
    setIsRegister(!isRegister);
  };

  //定義された項目への状態変数に値入力
  const handleData = (data: string, isEmpty: boolean, value?: string) => {
    if (data === "名前") {
      setIsName(!isEmpty);
      if (nameRef.current && !!value) {
        nameRef.current.value = value;
      }
    } else if (data === "電話番号" || data === "メール") {
      setIsPhoneNumOrEmail(!isEmpty);
      if (data === "電話番号") {
        if (phoneNumRef.current && !!value) {
          validation_phoneNumber(value);
          phoneNumRef.current.value = value;
        }
      } else {
        if (emailRef.current && !!value) {
          validation_email(value);
          emailRef.current.value = value;
        }
      }
    } else if (data === "月") {
      setIsMonth(!isEmpty);
      if (monthRef.current && !!value) {
        monthRef.current.value = value;
      }
    } else if (data === "日") {
      setIsDay(!isEmpty);
      if (dayRef.current && !!value) {
        dayRef.current.value = value;
      }
    } else if (data === "年") {
      setIsYear(!isEmpty);
      if (yearRef.current && !!value) {
        yearRef.current.value = value;
      }
    } else if (data === "パスワード") {
      setIsPassword(!isEmpty);
      if (passwordRef.current && !!value) {
        validation_password(value);
        passwordRef.current.value = value;
      }
    } else if (data == "ユーザー名") {
      setIsUsername(!isEmpty);
      if (usernameRef.current && !!value) {
        validation_username(value);
        usernameRef.current.value = value;
      }
    }
  };

  //ユーザー名へのバリデーション
  const validation_username = async (u: string) => {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (usernamePattern.test(u)) {
      const isExist = await usernameExist(u);
      if (isExist) {
        setHasErrorUsername(true);
      } else {
        setHasErrorUsername(false);
      }
    } else {
      setHasErrorUsername(true);
    }
  };

  //電話番号へのバリデーション
  const validation_phoneNumber = (p: string) => {
    const phonePattern = /^(?:\d{11}|\d{3}-\d{4}-\d{4})$/;

    if (phonePattern.test(p)) {
      setHasErrorPhone(false);
    } else {
      setHasErrorPhone(true);
    }
  };

  //メールへのバリデーション
  const validation_email = (e: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(e)) {
      setHasErrorEmail(false);
    } else {
      setHasErrorEmail(true);
    }
  };

  //パスワードのバリデーション
  const validation_password = (e: string) => {
    if (e.length >= 8) {
      setHasErrorPassword(false);
    } else {
      setHasErrorPassword(true);
    }
  };

  //トプ画変更ボタンが押された時の処理
  const handlePhotoClick = () => {
    setIsPhoto(true);
  };

  //ShapeImageをクリックしたらファイルアップロードできるようにする
  const handleFileUpload = () => {
    fileRef.current?.click();
  };

  //動的ShapeImageに値設定
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setShapeImageURL(URL.createObjectURL(file));
    }
  };

  //アンマウント後URL削除
  useEffect(() => {
    return () => {
      if (shapeImageURL) {
        URL.revokeObjectURL(shapeImageURL);
      }
    };
  }, [shapeImageURL]);

  //プロフィール画像設定完了（何もしない場合デフォルト画像）処理
  const handleProfileImage = () => {
    setIsNext(false);
    setIsRegister(false);
    setIsSetProfileImage(!isSetProfileImage);
  };

  //サインアップ処理
  const handleSignup = () => {
    formRef.current?.submit;
  };

  return (
    <>
      <div
        className={"relative border border-gray-100 rounded-xl z-50"}
        style={{ width: "37rem", height: "40.3rem" }}
      >
        {/* ×アイコン */}
        <div className="absolute top-3 left-3">
          <CloseIcon color="disabled" />
        </div>
        {/* Twitterロゴ */}
        <div className="flex justify-center">
          <div className="pt-3">
            <Logo imgPath="TwitterLogo.png" imgSize="sm" />
          </div>
        </div>
        {/* 状態に応じて見出し変更 */}
        <p
          className="pt-10 pb-1 text-3xl font-bold"
          style={{ paddingLeft: "6.5rem" }}
        >
          {!isNext && !isRegister && !isSetProfileImage && "アカウント作成"}
          {isNext && !isRegister && !isSetProfileImage && "パスワードを入力"}
          {!isNext &&
            isRegister &&
            !isSetProfileImage &&
            "プロフィール画像を選ぶ"}
          {!isNext && !isRegister && isSetProfileImage && "名前を入力"}
        </p>
        {/* 次へボタンが押された　or 登録するボタンが押された or プロフィール画像完了後 */}
        {(isNext || isRegister || isSetProfileImage) && (
          <>
            <p
              className="text-gray-400 text-xs"
              style={{
                paddingLeft: "6.5rem",
                paddingBottom: "2rem",
                marginRight: "6rem",
              }}
            >
              {isNext &&
                !isRegister &&
                !isSetProfileImage &&
                "8文字以上にしてください。"}
              {!isNext &&
                isRegister &&
                !isSetProfileImage &&
                "お気に入りの画像をアップロードしましょう。"}
              {!isNext &&
                isSetProfileImage &&
                !isRegister &&
                "Twitterで使われるアドレスです。英数字のみ使用できます。すでに使われている名前は設定できません。あとから変更することもできます。"}
            </p>
            {/* ユーザーネーム登録（サインアップページ4ページ目） */}
            {isSetProfileImage ? (
              <>
                <div className="flex flex-col items-center">
                  <div className="mb-7 w-96">
                    <TextBox
                      placeholder="ユーザー名"
                      size="lg"
                      handleData={handleData}
                      variant="text"
                      hasError={hasErrorUsername}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ paddingTop: "16.8rem" }}>
                    {isUsername && !hasErrorUsername && (
                      <Button
                        size="lg"
                        text="登録する"
                        btnColor="white"
                        isBold={true}
                        onClick={handleSignup}
                        borderColor="rgba(229, 231, 235, 1)"
                        textColor="rgba(0, 0, 0, 1)"
                      />
                    )}
                    {(!isUsername || hasErrorUsername) && (
                      <Button
                        size="lg"
                        text="登録する"
                        btnColor="white"
                        isBold={true}
                        borderColor="rgba(229, 231, 235, 1)"
                        textColor="rgba(0, 0, 0, 1)"
                        isDeactive={true}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 次へボタンが押された時（サインアップページ2ページ目） */}
                {isNext && !isRegister && (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="mb-7 w-96">
                        <TextBox
                          placeholder="パスワード"
                          size="lg"
                          handleData={handleData}
                          variant="password"
                          hasError={hasErrorPassword}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div style={{ paddingTop: "17.8rem" }}>
                        {isPassword && !hasErrorPassword && (
                          <Button
                            size="lg"
                            text="登録する"
                            btnColor="white"
                            isBold={true}
                            onClick={handleRegisterClick}
                            borderColor="rgba(229, 231, 235, 1)"
                            textColor="rgba(0, 0, 0, 1)"
                          />
                        )}
                        {(!isPassword || hasErrorPassword) && (
                          <Button
                            size="lg"
                            text="登録する"
                            btnColor="white"
                            isBold={true}
                            borderColor="rgba(229, 231, 235, 1)"
                            textColor="rgba(0, 0, 0, 1)"
                            isDeactive={true}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/* 登録するボタンが押された時（サインアップページ3ページ目） */}
                {isRegister && (
                  <>
                    <div className="flex justify-center">
                      <div
                        className="pt-32 relative"
                        onClick={handleFileUpload}
                      >
                        <div onClick={handlePhotoClick}>
                          {!!shapeImageURL ? (
                            <ShapeImage imgPath={shapeImageURL} imgSize="lg" />
                          ) : (
                            <ShapeImage
                              imgPath="UserImageSample.png"
                              imgSize="lg"
                            />
                          )}
                        </div>

                        <div className="absolute z-50 left-11 bottom-10">
                          <AddAPhotoIcon />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div style={{ paddingTop: "10.88rem" }}>
                        {isPhoto && (
                          <Button
                            size="lg"
                            text="次へ"
                            btnColor="blue"
                            isBold={true}
                            onClick={handleProfileImage}
                            borderColor="transparent"
                            textColor="rgba(255, 255, 255, 1)"
                          />
                        )}
                        {!isPhoto && (
                          <Button
                            size="lg"
                            text="今はしない"
                            onClick={handleProfileImage}
                            btnColor="white"
                            isBold={true}
                            borderColor="rgba(229, 231, 235, 1)"
                            textColor="rgba(0, 0, 0, 1)"
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {/* サインアップページ1ページ目 */}
        {!isNext && !isNext && !isSetProfileImage && (
          <>
            <div className="flex flex-col items-center">
              <div className="mb-7 w-96">
                <TextBox placeholder="名前" size="lg" handleData={handleData} />
              </div>
              <div className="mb-4 w-96">
                {isPhoneNum && (
                  <TextBox
                    placeholder="電話番号"
                    size="lg"
                    handleData={handleData}
                    variant="tel"
                    hasError={hasErrorPhone}
                  />
                )}
                {!isPhoneNum && (
                  <TextBox
                    placeholder="メール"
                    size="lg"
                    handleData={handleData}
                    variant="email"
                    hasError={hasErrorEmail}
                  />
                )}
              </div>
            </div>
            <p
              className="text-blue-400 hover:underline"
              style={{ paddingLeft: "14.5rem" }}
              onClick={handlePhoneNumOrEmail}
            >
              かわりにメールアドレスを登録する
            </p>
            <p
              className="font-bold"
              style={{ paddingLeft: "6.5rem", paddingTop: "1rem" }}
            >
              生年月日
            </p>
            <p
              className="text-gray-400 text-xs"
              style={{
                paddingLeft: "6.5rem",
                paddingTop: ".3rem",
                paddingBottom: "1rem",
                marginRight: "6rem",
              }}
            >
              この情報は公開されません。このアカウントをビジネス、ペットなどに使う場合でも、ご自身の年齢を確認してください。
            </p>
            <div className="inline-flex" style={{ paddingLeft: "6.5rem" }}>
              <div className="mr-2">
                <DateBox label="月" handleData={handleData} />
              </div>
              <div className="mr-2">
                <DateBox label="日" handleData={handleData} />
              </div>
              <div>
                <DateBox label="年" handleData={handleData} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mt-24">
                {isName &&
                  isPhoneNumOrEmail &&
                  isMonth &&
                  isDay &&
                  isYear &&
                  !hasErrorEmail &&
                  !hasErrorPhone && (
                    <Button
                      size="lg"
                      text="次へ"
                      btnColor="white"
                      isBold={true}
                      onClick={handleNextButtonClick}
                      borderColor="rgba(229, 231, 235, 1)"
                      textColor="rgba(0, 0, 0, 1)"
                    />
                  )}
                {(!(
                  isName &&
                  isPhoneNumOrEmail &&
                  isMonth &&
                  isDay &&
                  isYear
                ) ||
                  hasErrorEmail ||
                  hasErrorPhone) && (
                  <Button
                    size="lg"
                    text="次へ"
                    btnColor="white"
                    isBold={true}
                    borderColor="rgba(229, 231, 235, 1)"
                    textColor="rgba(0, 0, 0, 1)"
                    isDeactive={true}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* ダミーフォーム */}
      <form ref={formRef} action="/main" method="POST">
        <input type="hidden" name="name" ref={nameRef} />
        <input type="hidden" name="phonenum" ref={phoneNumRef} />
        <input type="hidden" name="email" ref={emailRef} />
        <input type="hidden" name="month" ref={monthRef} />
        <input type="hidden" name="day" ref={dayRef} />
        <input type="hidden" name="year" ref={yearRef} />
        <input type="hidden" name="password" ref={passwordRef} />
        <input
          type="file"
          name="profileImg"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input type="hidden" name="username" ref={usernameRef} />
      </form>
    </>
  );
};

export default SignupForm;
