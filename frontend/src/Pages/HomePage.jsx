import { Box, Divider, Flex, Spinner } from "@chakra-ui/react"
// import { Link } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { useEffect, useState } from "react";
import { Post } from "../Components/Post";
import { useRecoilState } from "recoil";
import { postsAtom } from "../atoms/postAtom";
import { SuggestedUsers } from "../Components/SuggestedUsers";
import React from "react";


export const HomePage = () => {
  const [posts,setPosts] = useRecoilState(postsAtom);
  const [loading,setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(()=>{
    const getFeedPosts = async ()=>{
      setLoading(true);
      setPosts([]);
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

{posts.map((post, index) => (
  <React.Fragment key={post._id}>
    <Post key={post._id} post={post} postedBy={post.postedBy} />
    <Divider key={`divider-${index}`} ml={6} my={4} />
  </React.Fragment>
))}

    </Box>
    <Box
      flex={30}
      display={{
        base: "none",
        md: "block",
      }}
    >
    <SuggestedUsers/>
    </Box>
  </Flex>
)
    };
