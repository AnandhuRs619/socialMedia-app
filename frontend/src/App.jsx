import { Box, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { UserPage } from "./Pages/UserPage"
import { PostPage } from "./Pages/PostPage"
import { Header } from "./Components/Header"
import { HomePage } from "./Pages/HomePage"
import { AuthPage } from "./Pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import UpdateProfilePage from "./Pages/UpdateProfilePage"
import { ChatPage } from "./Pages/ChatPage"
import ErrorBoundary from "./Components/ErrorBoundary"
// import { CreatePost } from "./Components/CreatePost"

function App() {
 const user = useRecoilValue(userAtom);
   const { pathname } = useLocation();

  return (
    <ErrorBoundary>
    <Box position={"relative"}
    w={"full"}>
    <Container maxW= {pathname === "/" ? "900px" : "620px"} >
      <Header/>
       
     <Routes>
     <Route path="/" element={user ? <HomePage/>:<Navigate to="/auth"/>} />
     <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>} />
     <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

      <Route path="/:username"  element ={ <UserPage />} />
      <Route path="/:username/post/:pid"  element ={ <PostPage />} />
      <Route path="/chat"  element ={ user ? <ChatPage /> : <Navigate to={"/auth"}/>} />
       {/* <Route path="*" element={<NotFoundPage />} /> */}
     </Routes>
    
    {/* //  {user && <CreatePost/>} */}
     </Container>
     </Box>
     </ErrorBoundary>
  )
}

export default App
