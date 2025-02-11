import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/Atoms/Logo";
import TextBox from "@/components/Atoms/TextBox";
import Button from "@/components/Atoms/Button";
import { ReactNode } from "react";
import { useState, useRef } from "react";
import {
  usernameExist,
  emailExist,
  phoneExist,
  passwordCorrect,
} from "@/common/api/manage_user";

type LoginRootProps = {
  children: ReactNode;
};

const LoginRoot = ({ children }: LoginRootProps) => {
  return (
    <div
      className={"relative border border-gray-100 rounded-xl z-50 bg-white"}
      style={{ width: "37rem", height: "40.3rem" }}
    >
      {children}
    </div>
  );
};

type ProccessedCloseIconProps = {
  onClick?: () => void;
};

const ProcessedCloseIcon = ({ onClick }: ProccessedCloseIconProps) => {
  return (
    <div
      className="absolute top-3 sm:left-3 left-16 hover:rounded-full hover:bg-black hover:bg-opacity-30"
      onClick={onClick}
    >
      <CloseIcon color="disabled" />
    </div>
  );
};

const ProcessedTwitterIcon = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-3">
        <Logo imgPath="TwitterLogo.png" imgSize="sm" />
      </div>
    </div>
  );
};

type TitleProps = {
  titleText: string;
};

const Title = ({ titleText }: TitleProps) => {
  return (
    <p
      className="pt-10 pb-1 text-3xl font-bold"
      style={{ paddingLeft: "6.5rem" }}
    >
      {titleText}
    </p>
  );
};

type TextBoxWrapperProps = {
  children: ReactNode;
};

const TextBoxWrapper = ({ children }: TextBoxWrapperProps) => {
  return <div className="mb-7 w-96">{children}</div>;
};

type ButtonWrapperProps = {
  style?: string; //tailwindcss形式の文字列指定
  children: ReactNode;
};

const ButtonWrapper = ({ style, children }: ButtonWrapperProps) => {
  return <div className={`${style}`}>{children}</div>;
};

type ToSignupProps = {
  link: string;
};

const ToSignup = ({ link }: ToSignupProps) => {
  return (
    <>
      <p className="text-gray-400 text-xs" style={{ paddingLeft: "6.5rem" }}>
        アカウントをお持ちでない場合は
        <a
          href={`${link}`}
          className="text-blue-400 hover:text-blue-600 hover:underline"
        >
          登録
        </a>
      </p>
    </>
  );
};

type LoginPage1Props = {
  handleNext?: () => void;
  handleData?: (data: string, isEmpty: boolean, value?: string) => void;
};

type NotFoundAccountProps = {
  text: string;
};

const NotFoundAccount = ({ text }: NotFoundAccountProps) => {
  return (
    <>
      <div className="flex justify-center z-50">
        <div className="sm:mt-40 mt-10 px-2 py-3 w-60 rounded bg-blue-400">
          <p className="text-white text-center">{text}</p>
        </div>
      </div>
    </>
  );
};

const LoginPage1 = ({ handleNext, handleData }: LoginPage1Props) => {
  //アカウントが見つからないorフォームが空白　→　true
  const [isEmpty, setIsEmpty] = useState(true);
  //isEmptyがtrueの状態で「次へ」ボタンが押された　→　true
  const [isNotFound, setIsNotFound] = useState(false);

  const handleDataChange = async (
    data: string,
    isEmpty: boolean,
    value?: string
  ) => {
    setIsNotFound(false);
    try {
      let isExistUsername = await usernameExist(value);
      let isExistEmail = await emailExist(value);
      let isExistPhone = await phoneExist(value);

      if ((isExistUsername || isExistEmail || isExistPhone) && !isEmpty) {
        setIsEmpty(false);
        handleData && handleData(data, isEmpty, value);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      if (error == "") {
        alert("エラーが発生しています")
      } else {
        alert(error);
      }      
    }
  };

  const handleClickNext = () => {
    if (!isEmpty) {
      handleNext && handleNext();
    } else {
      setIsNotFound(true);
    }
  };

  return (
    <>
      {/* タイトル */}
      <Title titleText="Twitterにログイン" />
      <div className="flex flex-col items-center">
        <TextBoxWrapper>
          <TextBox
            placeholder="電話番号/メールアドレス/ユーザー名"
            size="lg"
            variant="text"
            handleData={handleDataChange}
          />
        </TextBoxWrapper>
        <ButtonWrapper style="mb-7">
          <Button
            size="lg"
            text="次へ"
            btnColor="white"
            isBold={true}
            onClick={handleClickNext}
            borderColor="rgba(229, 231, 235, 1)"
            textColor="rgba(0, 0, 0, 1)"
          />
        </ButtonWrapper>

        <ButtonWrapper style="mb-24">
          <Button
            size="lg"
            text="パスワードを忘れた場合"
            btnColor="blue"
            isBold={true}
            borderColor="transparent"
            textColor="rgba(255, 255, 255, 1)"
          />
        </ButtonWrapper>
      </div>
      <ToSignup link="/" />
      {isNotFound && <NotFoundAccount text="アカウントが見つかりません。" />}
    </>
  );
};

type FilledInFormProps = {
  text: string;
};

const FilledInForm = ({ text }: FilledInFormProps) => {
  return (
    <>
      <div className="px-2 py-3 w-96 mb-7 rounded border bg-gray-200">
        {text}
      </div>
    </>
  );
};

type LoginPage2Props = {
  text: string;
  handleData?: (data: string, isEmpty: boolean, value?: string) => void;
  handleNext?: () => void;
  hasError?: boolean;
};

const LoginPage2 = ({
  text,
  handleData,
  handleNext,
  hasError = false,
}: LoginPage2Props) => {
  const handleDataChange = (data: string, isEmpty: boolean, value?: string) => {
    handleData && handleData(data, isEmpty, value);
  };

  const handleNextClick = () => {
    handleNext && handleNext();
  };

  return (
    <>
      <Title titleText="パスワードを入力" />
      <div className="flex flex-col items-center">
        <FilledInForm text={`${text}`} />
        <TextBoxWrapper>
          <TextBox
            placeholder="パスワード"
            size="lg"
            variant="password"
            hasError={hasError}
            handleData={handleDataChange}
          />
        </TextBoxWrapper>
        <ButtonWrapper style="mt-64 mb-6">
          <Button
            size="lg"
            text="ログイン"
            btnColor="blue"
            isBold={true}
            onClick={handleNextClick}
            borderColor="transparent"
            textColor="rgba(255, 255, 255, 1)"
          />
        </ButtonWrapper>
      </div>
      <ToSignup link="/" />
    </>
  );
};

type LoginProps = {
  onClick?: () => void;
  handleLogin?: (id: number | string) => void;
};

const Login = ({ onClick, handleLogin }: LoginProps) => {
  //フォームの表示変更に対するフラグ
  const [isNext, setIsNext] = useState(0);
  //パスワード画面にてloginForm1で入力したテキストを表示する用
  const [text, setText] = useState("");
  //LoginForm1の入力データを格納用
  const [value, setValue] = useState("");
  //パスワードが一致しているかどうか
  const [correctPassword, setCorrectPassword] = useState(true);
  //ダミーインプット（username or email or phone）
  const loginInfoRef = useRef<HTMLInputElement>(null);
  //ダミーインプット（password）
  const passwordRef = useRef<HTMLInputElement>(null);
  //ダミーフォーム
  const formRef = useRef<HTMLFormElement>(null);
  const handleNext = async () => {
    if (isNext === 0) {
      setText(value);
      if (loginInfoRef.current) {
        loginInfoRef.current.value = value;
      }
      let next = isNext + 1;
      setIsNext(next);
    } else {
      if (passwordRef.current) {
        passwordRef.current.value = value;
      }
      if (formRef.current) {
        const loginuser = await passwordCorrect(
          loginInfoRef.current?.value,
          passwordRef.current?.value
        );
        if (loginuser !== null) {
          setCorrectPassword(true);
          handleLogin && handleLogin(loginuser.id);
        } else {
          setCorrectPassword(false);
        }
      }
    }
  };
  //LoginForm1の入力データを取得
  const handleData = (data: string, isEmpty: boolean, value?: string) => {
    setCorrectPassword(true);
    if (!!value) {
      setValue(value);
    }
  };
  return (
    <>
      <LoginRoot>
        {/* ×アイコン */}
        <ProcessedCloseIcon onClick={onClick} />
        {/* Twitterロゴ */}
        <ProcessedTwitterIcon />
        {/* LoginPage1 */}
        {isNext === 0 && (
          <LoginPage1 handleNext={handleNext} handleData={handleData} />
        )}
        {/* LoginPage2 */}
        {isNext === 1 && (
          <LoginPage2
            text={text}
            handleData={handleData}
            handleNext={handleNext}
            hasError={!correctPassword}
          />
        )}
      </LoginRoot>
      <form ref={formRef} action="/main" method="POST">
        <input type="hidden" name="login_info" ref={loginInfoRef} />
        <input type="hidden" name="password" ref={passwordRef} />
      </form>
    </>
  );
};

export default Login;
