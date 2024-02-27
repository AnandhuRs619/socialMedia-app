import { useEffect, useState } from "react";
import { UserHeader } from "../Components/UserHeader";
// import { UserPost } from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from "@chakra-ui/react";
import { Post } from "../Components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import { postsAtom } from "../atoms/postAtom";

export const UserPage = () => {
  const {user,loading} = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true); // Fixed the typo

  useEffect(() => {
    

    const getPost = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

   
    getPost();
  }, [username, showToast,setPosts]);
console.log("post is here ",posts)
  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User Not Found </h1>;
  }

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent="center" my={10}>
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) => (
				<Post  key={post._id} post={post} postedBy={post.postedBy} />
			))}
    </>
  );
};
