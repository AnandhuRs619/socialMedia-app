import { Box, Divider, Flex, Spinner } from "@chakra-ui/react"
// import { Link } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { useEffect, useState } from "react";
import { Post } from "../Components/Post";



export const HomePage = () => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(()=>{
    const getFeedPosts = async ()=>{
      setLoading(true);
    try {
      const res = await fetch("/api/posts/feed");
      const data = await res.json();
      setPosts(data)
      if(data.error){
        showToast("Eroor",data.error,"error");
      }
      
    } catch (error) {
      showToast("Error",error.message,"error")
    }finally{
      setLoading(false);
    }
  }
  getFeedPosts();
  },[showToast, setPosts]) 
  return (
    <Flex gap='10' alignItems={"flex-start"}>
    <Box flex={70}>
      {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

      {loading && (
        <Flex justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}

      {posts.map((post) => (
      <>
        <Post key={post._id} post={post} postedBy={post.postedBy} />
        <Divider ml={6} my={4}/>
        </>
        ))}
    </Box>
    <Box
      flex={30}
      display={{
        base: "none",
        md: "block",
      }}
    >
      
    </Box>
  </Flex>
)
    };
