import { useRecoilValue } from "recoil"
import { LoginCard } from "../Components/LoginCard"
import { SignupCard } from "../Components/SignupCard"
import authScreenAtom from "../atoms/authAtom"
import { OtpCard } from "../Components/otpCard"
import { ForgotPasswordCard } from "../Components/ForgotPasswordCard"



export const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
        console.log(authScreenState)
        
  return (
    <>
   {authScreenState === "login" && <LoginCard />}
      {authScreenState === "signup" && <SignupCard />}
      {authScreenState === "otp" && <OtpCard/>}
      {authScreenState === "forgotPassword" && <ForgotPasswordCard/>}

    </>
  )
}
