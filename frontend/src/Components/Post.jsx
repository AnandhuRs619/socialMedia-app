import {  Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react"
import { Avatar  } from "@chakra-ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import { Actions } from "./Action"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from 'date-fns';
import useShowToast from "../hooks/useShowToast"


export const Post = ({post,postedBy}) => {
    const [liked,setLiked] = useState("false")
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const navigate = useNavigate();

    useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch("/api/users/profile/" + postedBy);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setUser(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setUser(null);
			}
		};

		getUser();
	}, [postedBy, showToast]);
    if(!user)return null;
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name={user.name} src={user.profilePic}
          onClick={(e) =>{
            e.preventDefault();
            navigate(`/${user.username}`)
          }}
          ></Avatar>
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
          {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
						{post.replies[0] && (
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[0].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left='15px'
								padding={"2px"}
							/>
						)}
                            {post.replies[1] && (
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[1].userProfilePic}
								position={"absolute"}
								bottom={"0px"}
								right='-5px'
								padding={"2px"}
							/>
						)}

						{post.replies[2] && (
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[2].userProfilePic}
								position={"absolute"}
								bottom={"0px"}
								left='4px'
								padding={"2px"}
							/>
						)}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}
               onClick={(e) =>{
                e.preventDefault();
                navigate(`/${user.username}`)
              }}
              >
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"} flexDirection={"row"}>
            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
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
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={'"gray.light'}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.replies.length} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
