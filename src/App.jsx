import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { UserPage } from "./Pages/UserPage"
import { PostPage } from "./Pages/PostPage"
import { Header } from "./Components/Header"

function App() {
 

  return (
    <Container maxW='620px' >
      <Header/>
     <Routes>
      <Route path="/:username"  element ={ <UserPage />} />
      <Route path="/:username/post/:pid"  element ={ <PostPage />} />
     </Routes>
     </Container>
  )
}

export default App
