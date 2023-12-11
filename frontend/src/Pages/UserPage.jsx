import { UserHeader } from "../Components/UserHeader"
import { UserPost } from "../Components/UserPost"


export const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes={12000} replies={321} postImg='/post1.png' postTitle='Lets talk about Black Space.'/>
    <UserPost likes={323} replies={33} postImg='/post2.png' postTitle='Things just got out of hand.'/>
    <UserPost likes={942} replies={654} postImg='/post3.png' postTitle='I love 3000.'/>
    
    </>
  )
}
