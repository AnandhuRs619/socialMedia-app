import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorModeValue } from "@chakra-ui/react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";


export default function Conversation({conversation}) {

    const user = conversation.participants[0];
    const currentUser = useRecoilValue(userAtom);
    const lastMessage = conversation.lastMessage;
   
  return (
    <Flex gap={4} alignItems={"center"} p={"1"}
    _hover={{
        cursor:"pointer",
        bg: useColorModeValue("gray.600","gray.dark"),
        color:"white",
    }}
    borderRadius={"md"}>
        <WrapItem>
            <Avatar size={{
                Base:"xs",
                sm:"sm",
                md:"md"
            }}
            src={user.profilePic}
            >

            <AvatarBadge boxSize="1em" bg={"green.500"} />
            </Avatar>
            
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight={"700"} display={"flex"} alignItems={"center"} >
                {user.username} 
                <Image src="/verified.png" w={4} h={4} ml={1} />
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center" } gap={1} >
                {currentUser._id === lastMessage.sender ? <BsCheck2All size={16}/> : ""}
            {lastMessage.text.length > 18
						? lastMessage.text.substring(0, 18) + "..."
						: lastMessage.text || <BsFillImageFill size={16} />}
            </Text>
        </Stack>
      
    </Flex>
  )
}
