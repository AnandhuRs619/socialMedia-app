import { Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"



export const HomePage = () => {
  return (
    <Link to={"/markzukerberg"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"} > Vist profile page</Button>

        </Flex>
    </Link>
  )
}
