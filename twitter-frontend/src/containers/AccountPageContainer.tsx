import Logo from "@/components/Atoms/Logo";
import { ReactNode } from "react";
import Button from "@/components/Atoms/Button";
import SignupForm from "@/components/Molecules/SignupForm";
import Login from "@/components/Molecules/LoginForm";
import { useState } from "react";

type LogoRootProps = {
  children: ReactNode;
};

const LogoRoot = ({ children }: LogoRootProps) => {
  return <div className="relative">{children}</div>;
};

const MainText = () => {
  return (
    <div className="pl-24 pt-40 mr-16 lg:pl-96 lg:ml-80 lg:pt-20">
      <p className="text-7xl font-bold">すべての話題が、 ここに。</p>
    </div>
  );
};

const SubText = () => {
  return (
    <div className="pl-24 pt-16 lg:pl-96 lg:ml-80">
      <p className="text-4xl font-bold">今すぐ参加しましょう。</p>
    </div>
  );
};

type ButtonWrapperProps = {
  children: ReactNode;
  style?: string;
};

const ButtonWrapper = ({ children, style }: ButtonWrapperProps) => {
  return <div className={style}>{children}</div>;
};

type AccountPageContainerProps = {
  handleSignup?: () => void;
  handleLogin?: (id: number | string) => void;
};

const AccountPageContainer = ({
  handleSignup,
  handleLogin,
}: AccountPageContainerProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  //ログインorアカウントを作成が押されたフラグ
  const [isClick, setIsClick] = useState(false);

  const handleClickSignup = () => {
    window.scrollTo({ top: 0 });

    setIsClick(!isClick);
    setIsSignup(!isSignup);
  };

  const handleClickLogin = () => {
    window.scrollTo({ top: 0 });
    setIsClick(!isClick);
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="relative">
        <LogoRoot>
          <div className="absolute top-10 left-24 lg:top-56 lg:left-52">
            <Logo imgSize="xl" imgPath="TwitterLogo.png" />
          </div>
        </LogoRoot>

        {isSignup && (
          <div className="sm:fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div>
              <SignupForm
                onClick={handleClickSignup}
                handleSignup={handleSignup}
              />
            </div>
          </div>
        )}
        {isLogin && (
          <div className="sm:fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div>
              <Login onClick={handleClickLogin} handleLogin={handleLogin} />
            </div>
          </div>
        )}

        {!isClick && (
          <div className="absolute">
            <MainText />
            <SubText />
            <ButtonWrapper style="pl-24 pt-10 lg:pl-96 lg:ml-80">
              <Button
                isDeactive={isLogin}
                text="アカウントを作成"
                btnColor="blue"
                isBold={true}
                textColor="white"
                onClick={handleClickSignup}
                borderColor="transparent"
              />
            </ButtonWrapper>
            <ButtonWrapper style="pl-24 pt-20 lg:pl-96 lg:ml-80 lg:pt-52">
              <p className="font-bold pb-4">アカウントをお持ちの場合</p>
              <Button
                isDeactive={isSignup}
                text="ログイン"
                btnColor="white"
                isBold={true}
                textColor="black"
                onClick={handleClickLogin}
                borderColor="rgba(229, 231, 235, 1)"
              />
            </ButtonWrapper>
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPageContainer;
