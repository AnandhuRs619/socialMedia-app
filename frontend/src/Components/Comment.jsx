import { Avatar, Box, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

export const Comment = ({ reply, lastReply }) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const checkFollowStatus = () => {
      if (currentUser && currentUser.following) {
        const isFollowing = currentUser.following.includes(reply.userId);
        setIsFollowed(isFollowing);
      }
    };

    checkFollowStatus();
  }, [currentUser, reply.userId]);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }

    if (updating) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/users/follow/${reply.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data)
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (!isFollowed) {
        console.log(currentUser)
          currentUser.following.push(reply.userId);
        showToast("Success", `Followed ${reply.username}`, "success");
        
      } else {
        showToast("Success", `Unfollowed ${reply.username}`, "success");
        // Simulate removing from followers
        const index = currentUser.following.indexOf(reply.userId);
        if (index !== -1) {
          currentUser.followers.splice(index, 1);
        }
      }

      setIsFollowed(!isFollowed);
    } catch (error) {
      showToast("Error", error.message || "Something went wrong", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"} position="relative">
        <Avatar
          src={reply.userProfilePic}
          name={reply.username}
          size="md"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${reply.username}`);
          }}
        >
          {!isFollowed && currentUser._id !== reply.userId && (
            <IoMdAddCircle
              color="white"
              onClick={(e) => {
                e.stopPropagation(); // prevent the click event from propagating to the Avatar
                handleFollowUnfollow();
              }}
            />
          )}
        </Avatar>
        <Flex gap={4} w={'full'} flexDirection={'column'}>
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'} onClick={(e) =>{
                 e.preventDefault();
                navigate(`/${reply.username}`)
                }} > {reply.username} </Text>
              <Image src="/verified.png" w={4} h={4} ml={4} />
            </Flex>
            <Flex gap={2} alignItems={'center'}>
              {reply.createdAt ? (
                <Text fontSize={'sm'} color={'gray.light'}>
                  {formatDistanceToNow(new Date(reply.createdAt))} ago
                </Text>
              ) : null}

              {currentUser._id === reply.userId && (
                <Box onClick={(e) => e.preventDefault()} className="icon-container">
                  <Menu>
                    <MenuButton>
                      <BsThreeDots cursor={"pointer"}>Actions</BsThreeDots>
                    </MenuButton>
                    <Portal>
                      <MenuList bg={"gray.dark"}>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} borderBottom={'1px solid gray'}>Hide like count </MenuItem>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} icon={<DeleteIcon size={20} />} color={'red'} >Delete</MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              )}
              {currentUser._id !== reply.userId && (
                <Box onClick={(e) => e.preventDefault()} className="icon-container">
                  <Menu>
                    <MenuButton>
                      <BsThreeDots cursor={"pointer"}>Actions</BsThreeDots>
                    </MenuButton>
                    <Portal>
                      <MenuList bg={"gray.dark"}>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} borderBottom={'1px solid gray'} >Unfollow</MenuItem>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} borderBottom={'1px solid gray'}>Mute</MenuItem>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} borderBottom={'1px solid gray'}>Hide </MenuItem>
                        <MenuItem bg={"gray.dark"} fontWeight={'bold'} color={'red'} >Report</MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              )}
            </Flex>
          </Flex>
          <Text>{reply.text}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {reply.likes?.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};
