import {  Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react"
import { Avatar  } from "@chakra-ui/avatar"
import { Link } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import { Actions } from "./Action"
import { useState } from "react"


export const UserPost = ({postImg,postTitle,likes,replies}) => {
    const [liked,setLiked] = useState('false')
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark" src="/zuck-avatar.png"></Avatar>
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John cena"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John cena"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              bottom={"0px"}
              right={"5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John cena"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"} flexDirection={"row"}>
              <Text fontStyle={"sm"} fontSize={"sm"} color={"gray.light"}>
                1 day
              </Text>
              <Box onClick={(e) => e.preventDefault()} className="icon-container">
              <Menu>
              <MenuButton  >
                <BsThreeDots   cursor={"pointer"}>Actions</BsThreeDots>
                </MenuButton>
                <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'} borderBottom={'1px solid gray'} >Pin to porfile</MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}borderBottom={'1px solid gray'}>Archive</MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'}borderBottom={'1px solid gray'}>Hide like count </MenuItem>
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'} color={'red'} >Delete</MenuItem>
                </MenuList>
                </Portal>
              </Menu>
              </Box>
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={'"gray.light'}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
