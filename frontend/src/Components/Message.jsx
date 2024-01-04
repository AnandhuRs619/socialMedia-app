import { Avatar, Flex, Text } from "@chakra-ui/react"


export const Message = ({ownMessage}) => {
  return (
    <>
    {ownMessage ?(
       <Flex gap={2} alignSelf={"flex-end"}>
        <Text maxW={"350px"} bg={"blue.400"} p={1}
        borderRadius={"md"} >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto itaque laboriosam provident vel, culpa, voluptate dolorum n
        </Text>
        <Avatar src="" h={7} w={7}/>
       </Flex>
    ) :
    (
<Flex gap={2} >
  <Avatar src="" h={7} w={7}/>
        <Text maxW={"350px"} bg={"gray.400"} p={1}
        borderRadius={"md"}  >
          Lorem ipsum,  debitis nihil.
        </Text>
       </Flex>
    )}
   
    </>
  )
}
