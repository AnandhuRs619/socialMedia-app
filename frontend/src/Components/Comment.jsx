import { Avatar, Box, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react";
// import { useState } from "react"
import { BsThreeDots } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
// import useGetUserProfile from "../hooks/useGetUserProfile";
import { DeleteIcon } from "@chakra-ui/icons";
// import { Actions } from "./Action";


export const Comment = ({reply}) => {
    // const [liked,setLiked] = useState(false);
   
    const currentUser =useRecoilValue(userAtom);
  return (
    <>
    <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar  src={reply.userProfilePic} name={reply.username} size={'sm'}/>
        <Flex gap={1} w={'full'} flexDirection={'column'} >
            <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'sm'} fontWeight={'bold'}  > {reply.username}</Text>
                <Flex gap={2}  alignItems={'center'}>
                    {/* <Text fontSize={'sm'} color={'gray.light'}>{reply.createdAt}</Text> */}
                    {currentUser._id=== reply.userId&& 
              <Box onClick={(e) => e.preventDefault()} className="icon-container">
              <Menu>
              <MenuButton  >
                <BsThreeDots   cursor={"pointer"}>Actions</BsThreeDots>
                </MenuButton>
                <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}borderBottom={'1px solid gray'}>Hide like count </MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'} icon={<DeleteIcon size={20} />}  color={'red'} >Delete</MenuItem>
                </MenuList>
                </Portal>
              </Menu>
              </Box>
              }
              {currentUser._id !== reply.userId&& 
              <Box onClick={(e) => e.preventDefault()} className="icon-container">
              <Menu>
              <MenuButton  >
                <BsThreeDots   cursor={"pointer"}>Actions</BsThreeDots>
                </MenuButton>
                <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'} borderBottom={'1px solid gray'} >Unfollow</MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}borderBottom={'1px solid gray'}>Mute</MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}borderBottom={'1px solid gray'}>Hide </MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}  color={'red'} >Report</MenuItem>
                </MenuList>
                </Portal>
              </Menu>
              </Box>
              }
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
