import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
// import { useState } from "react"
import { BsThreeDots } from "react-icons/bs";
// import { Actions } from "./Action";


export const Comment = ({reply}) => {
    // const [liked,setLiked] = useState(false);
  return (
    <>
    <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar  src={reply.userProfilePic} size={'sm'}/>
        <Flex gap={1} w={'full'} flexDirection={'column'} >
            <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'sm'} fontWeight={'bold'}  > {reply.username}</Text>
                <Flex gap={2}  alignItems={'center'}>
                    {/* <Text fontSize={'sm'} color={'gray.light'}>{reply.createdAt}</Text> */}
                    <BsThreeDots/>
                </Flex>
            </Flex>
            <Text>{reply.text}</Text>
            {/* <Actions liked={liked} setLiked={setLiked} /> */}
            <Text fontSize={'sm'} color={'gray.light'}>
                {100} likes
            </Text>
        </Flex>
    </Flex>
    <Divider/>
    </>
  )
}
