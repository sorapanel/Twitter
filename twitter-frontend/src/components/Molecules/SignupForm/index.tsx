import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/Atoms/Logo";
import TextBox from "@/components/Atoms/TextBox";
import { useState, useRef, useEffect } from "react";
import DateBox from "@/components/Atoms/DateBox";
import Button from "@/components/Atoms/Button";
import ShapeImage from "@/components/Atoms/ShapeImage";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { usernameExist, createUser } from "@/common/api/manage_user";
import { useRouter } from "next/router";

type SignupFormProps = {
  onClick?: () => void;
  handleSignup?: () => void;
};

const SignupForm = ({ onClick, handleSignup }: SignupFormProps) => {
  //電話番号とメールの入力切替を管理
  const [isPhoneNum, setIsPhoneNum] = useState("");
  const [isEmail, setIsEmail] = useState("");
  //それぞれのフォームの入力状態を管理
  //すべて（電話番号とメールはどちらか）を入力しないと次へは進めない
  const [isName, setIsName] = useState("");
  const [isPhoneNumOrEmail, setIsPhoneNumOrEmail] = useState(true);
  const [isMonth, setIsMonth] = useState("");
  const [isDay, setIsDay] = useState("");
  const [isYear, setIsYear] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isUsername, setIsUsername] = useState("");
  const [isProfile, setIsProfile] = useState<File | null>(null);

  //次へボタンが押された？
  const [isNext, setIsNext] = useState(false);
  //登録するボタンが押された？
  const [isRegister, setIsRegister] = useState(false);
  //写真選択ボタンが押された？
  const [isPhoto, setIsPhoto] = useState(false);
  //プロフィール画像設定完了（何もしない場合デフォルト画像）判定用
  const [isSetProfileImage, setIsSetProfileImage] = useState(false);

  //ダミーインプット用
  const fileRef = useRef<HTMLInputElement>(null);

  //バリデーションエラーでないか？
  const [hasErrorPhone, setHasErrorPhone] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorPassword, setHasErrorPassword] = useState(false);
  const [hasErrorUsername, setHasErrorUsername] = useState(false);

  //動的ShapeImageのURL作成用
  const [shapeImageURL, setShapeImageURL] = useState<string>("");

  //電話番号とメールを切り替える
  const handlePhoneNumOrEmail = () => {
    setIsPhoneNumOrEmail(!isPhoneNumOrEmail);
    setHasErrorEmail(false)
    setHasErrorPhone(false)
    setIsEmail("");
    setIsPhoneNum("");
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
      value && setIsName(value);
    } else if (data === "電話番号" || data === "メール") {
      if (data === "電話番号") {
        if (!!value) {
          validation_phoneNumber(value);
          setIsPhoneNum(value);
        }
      } else {
        if (!!value) {
          validation_email(value);
          setIsEmail(value);
        }
      }
    } else if (data === "月") {
      value && setIsMonth(value);
    } else if (data === "日") {
      value && setIsDay(value);
    } else if (data === "年") {
      value && setIsYear(value);
    } else if (data === "パスワード") {
      if (!!value) {
        validation_password(value);
        setIsPassword(value);
      }
    } else if (data == "ユーザー名") {
      if (!!value) {
        validation_username(value);
        setIsUsername(value);
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
      setIsProfile(file);
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

  //提出後処理
  const handleSubmit = async () => {
    try {
      const createdAccount = await createUser(
        isUsername,
        isName,
        isEmail,
        isPhoneNum,
        isProfile,
        isPassword,
        isMonth,
        isDay,
        isYear
      );
    } catch (error) {
      console.error("error:", error);
      alert("アカウント作成中にエラーが発生しました。もう一度やり直してください。");
    }

    handleSignup && handleSignup();
  };

  return (
    <>
      <div
        className={
          "relative border border-gray-100 rounded-xl z-50 bg-white w-9 w-10"
        }
        style={{ width: "37rem", height: "40.3rem" }}
      >
        {/* ×アイコン */}
        <div
          className="absolute top-3 sm:left-3 left-16 hover:rounded-full hover:bg-black hover:bg-opacity-30"
          onClick={onClick}
        >
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
                      <>
                        <Button
                          onClick={handleSubmit}
                          size="lg"
                          text="登録する"
                          btnColor="white"
                          isBold={true}
                          borderColor="rgba(229, 231, 235, 1)"
                          textColor="rgba(0, 0, 0, 1)"
                        />
                      </>
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
                        <input
                          type="file"
                          id="profileImg"
                          name="profileImg"
                          ref={fileRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
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
                {isPhoneNumOrEmail && (
                  <TextBox
                    placeholder="電話番号"
                    size="lg"
                    handleData={handleData}
                    variant="tel"
                    hasError={hasErrorPhone}
                  />
                )}
                {!isPhoneNumOrEmail && (
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
              className="absolute text-blue-400 hover:underline"
              style={{ right: 102 }}
              onClick={handlePhoneNumOrEmail}
            >
              かわりに{isPhoneNumOrEmail ? "メールアドレス" : "電話番号"}
              を登録する
            </p>
            <p
              className="font-bold"
              style={{ paddingLeft: "6.5rem", paddingTop: "2.54rem" }}
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
                  (isEmail !== "" || isPhoneNum !== "") &&
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
                {(!(isName && isMonth && isDay && isYear) ||
                  hasErrorEmail ||
                  hasErrorPhone ||
                  (isEmail === "" && isPhoneNum === "")) && (
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
    </>
  );
};

export default SignupForm;
