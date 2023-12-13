import { useRecoilValue } from "recoil"
import { LoginCard } from "../Components/LoginCard"
import { SignupCard } from "../Components/SignupCard"
import authScreenAtom from "../atoms/authAtom"



export const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
        console.log(authScreenState)
        
  return (
    <>
    {authScreenState=== "login" ? <LoginCard/> :<SignupCard/>}
    </>
  )
}
