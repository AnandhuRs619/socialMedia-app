import { Box, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserPage } from "./Pages/UserPage"
import { PostPage } from "./Pages/PostPage"
import { Header } from "./Components/Header"
import { HomePage } from "./Pages/HomePage"
import { AuthPage } from "./Pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import UpdateProfilePage from "./Pages/UpdateProfilePage"
import { ChatPage } from "./Pages/ChatPage"
// import { CreatePost } from "./Components/CreatePost"

function App() {
 const user = useRecoilValue(userAtom);

  return (
    <Box position={"relative"}
    w={"full"}>
    <Container maxW='620px' >
      <Header/>
       
     <Routes>
     <Route path="/" element={user ? <HomePage/>:<Navigate to="/auth"/>} />
     <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>} />
     <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

      <Route path="/:username"  element ={ <UserPage />} />
      <Route path="/:username/post/:pid"  element ={ <PostPage />} />
      <Route path="/chat"  element ={ user ? <ChatPage /> : <Navigate to={"/auth"}/>} />
      
     </Routes>
    
    {/* //  {user && <CreatePost/>} */}
     </Container>
     </Box>
  )
}

export default App
