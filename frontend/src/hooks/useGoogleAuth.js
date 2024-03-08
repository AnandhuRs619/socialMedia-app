
import useShowToast from "./useShowToast";

export const useGoogleAuth = async ()=>{
    const showToast = useShowToast()
    try {
        window.open(`/api/auth/google/calback`,
        "_self")
    } catch (error) {
        showToast("Error",error,"error")
    }
}