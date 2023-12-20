import { useEffect, useState } from "react"
import { UserHeader } from "../Components/UserHeader"
import { UserPost } from "../Components/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from "@chakra-ui/react";

export const UserPage = () => {
  const [user , setUser] = useState(null);
  const {username} = useParams()
  const showToast = useShowToast();
  const [loading , setLoading ] = useState(true);

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json();
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        setUser(data);
        console.log(data)

      } catch (error) {
        showToast("Error",error,"error")
        
      }finally{
        setLoading(false)
      }
    }
      getUser();

  },[username,showToast])
if(!user && loading){
  return (
    <Flex justifyContent={'center'} >
       <Spinner size={"xl"} />
    </Flex>
  )
 
}
if (!user && !loading) return <h1>User Not Found </h1>;


  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={12000} replies={321} postImg='/post1.png' postTitle='Lets talk about Black Space.'/>
    <UserPost likes={323} replies={33} postImg='/post2.png' postTitle='Things just got out of hand.'/>
    <UserPost likes={942} replies={654} postImg='/post3.png' postTitle='I love 3000.'/>
    
    </>
  )
}
