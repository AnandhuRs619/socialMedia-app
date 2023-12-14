import { Button, useToast } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import {FiLogOut} from "react-icons/fi"

export const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useToast()
    const handleLogout = async ()=>{
       try {
        
        // fetch
        const res = await fetch('/api/users/logout',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
        })
        const data = await (await res).json();
        if(DataTransfer.error){
            showToast("Error",data.error,"error");
            return;
        }

        localStorage.removeItem("user-threads");
        setUser(null);
       } catch (error) {
        showToast("Error",error,"error")
       } 
    }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
    <FiLogOut size={20} />
</Button>
  )
}
