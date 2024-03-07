import { Button, Text } from "@chakra-ui/react"
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";


export const SettingsPage = () => {
    const showToast =  useShowToast();
    const logout = useLogout();
    const freezeAccount = async () =>{
       if(!window.confirm("Are you sure you want to freeze your Account?")) return;
       try {
        const res = await fetch("/api/users/freeze",{
            method :"PUT",
            headers:{"Content-type":"application/json"},

        });
        const data = await res.json()
        if(data.error){
            showToast("Error",data.error,"error");
        }
        if(data.succes){
            await logout();
            showToast("Success","Your Account Has Been Frozen","success")
        }
       } catch (error) {
        showToast("Error",error.message,"error");
       }
    }
  return (
    <>
    <Text my={1} fontWeight={'bold'} >Freeze Your Account</Text>
    <Text my={1} mb={5} > You can unfreeze your account anytime by logging in.</Text>
    <Button size={"sm"} colorScheme ="red" onClick={freezeAccount}>
        Freeze Account
    </Button>
    </>
  )
}
