import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"

export const ChatPage = () => {
  return (
    <Box position={"absolute"} 
    left={"50%"}
    w={{
        base:"100%",
        md:"80%",
        lg:"750px"
    }}
    p={4}
    transform={"translateX(-50%)"}
    border={"1px solid red"}
    >
      <Flex gap={4} 
      flexDirection={{
        bse:"column",
        md:"row"
      }}
      maxW={{
        sm:"400px",
        md:"full"
      }}
      mx={"auto"}>
        <Flex flex={30} >Coversation
        <Text></Text>
        <form></form>
        </Flex>
        <Flex flex={70}>Message Container</Flex>

        </Flex>  
    </Box>
  )
}
