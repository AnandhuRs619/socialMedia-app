import { Avatar, Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Spinner, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Actions } from "../Components/Action"
import { useEffect, useState } from "react"
import { Comment } from "../Components/Comment"
import useGetUserProfile from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { DeleteIcon } from "@chakra-ui/icons"



export const PostPage = () => {
    const {user,loading} = useGetUserProfile();
    const [post,setPost]= useState(null);
    const showToast = useShowToast();
  const {pid} = useParams();
  const currentUser =useRecoilValue(userAtom);
  const navigate = useNavigate();

    useEffect(()=>{
      const getPost = async ()=>{
        try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error");
          return;

        }
        console.log(data);
        setPost(data);
        } catch (error) {
          showToast("Error",error.message,"error");
        }
      }
      getPost();
    },[showToast,pid]);

    const handleDeletepost = async (e)=>{
      try {
        e.preventDefault();
        if(!window.confirm("Are yuo want to delete this post ?")) return;
        const res = await fetch(`/api/posts/${post._id}`,{
          method: "DELETE",
        })
        const data = res.json()
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        showToast("Success","Post Deleted Successfully","success");
        navigate(`/${user.username}`);
      } catch (error) {
        showToast("Error",error.message,"error");
  
      }
    }
  
    
  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if(!post) return null;
   return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={"center"} gap={3} >
          <Avatar src={user.profilePic} size={'md'} name={user.username} />
          <Flex>
            <Text fontSize={'sm'}fontWeight={"bold"} >{user.username} </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
          </Flex>
          <Flex gap={4} alignItems={"center"} flexDirection={"row"}>
            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
							</Text>

              
              {currentUser._id=== user._id && 
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
                  <MenuItem bg={"gray.dark"}fontWeight={'bold'} icon={<DeleteIcon size={20} />} onClick={handleDeletepost} color={'red'} >Delete</MenuItem>
                </MenuList>
                </Portal>
              </Menu>
              </Box>
              }
              {currentUser._id !== user._id && 
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
      
        <Text my={3} > {post.text}</Text>
        {post.img && (
          <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'} >
          <Image src={post.img} w={'full'} />
        </Box>
        )}
        <Flex gap={3} my={3} >
          <Actions post={post} />
        </Flex>
        
        <Divider my={4}/>
        <Flex justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'} >
            <Text fontSize={'2xl'} >👋</Text>
            <Text color={'gray.light'}> Get app to like ,reply and post</Text>
          </Flex>
          <Button>
            Get
          </Button>
        </Flex>
        <Divider my={4}/>
        {post.replies.map((reply)=>(
          <Comment key={reply._id}  reply={reply}
          />
        )
          
        )}
       
        
    </>
  )
}
