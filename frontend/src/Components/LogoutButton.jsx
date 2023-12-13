import { Button, useToast } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";


export const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useToast()
    const handleLogout = async ()=>{
       try {
        
        // fetch
        const res = fetch('/api/user/logout',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
        })
        if(DataTransfer.error){
            showToast()
        }
        localStorage.removeItem("user-threads");
        setUser(null);
       } catch (error) {
        console.log(error)
       } 
    }
  return (
    <Button
    position={'fixed'}
    top={"30px"}
    right={"30px"}
    size={"sm"}
    onClick={handleLogout}

    >Logout</Button>
  )
}
