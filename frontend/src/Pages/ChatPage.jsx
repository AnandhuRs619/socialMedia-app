import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import Conversation from "../Components/Conversation";
import {GiConversation} from "react-icons/gi"
import { MessageContainer } from "../Components/MessageContainer";
import useShowToast from "../hooks/useShowToast"
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";



export const ChatPage = () => {
  const [searchingUser , setSearchingUser]= useState(false);
  const [loadingConversations,setLoadingConversations] = useState(true);
  const [searchText ,setSearchText] = useState("");
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast()
  const {socket , onlineUsers } = useSocket();

  useEffect(()=>{
    socket?.on("messagesSeen",({conversationId})=>{
      setConversations(prev =>{
        const updatedConversations = prev.map(conversation =>{
          if(conversation._id === conversationId){
            return{
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen : true
              }
            }
          }
          return conversation;
        })
        return updatedConversations
      })
    })
  },[socket , setConversations])

  useEffect(() => {
		const getConversations = async () => {
      
			try {
				const res = await fetch("/api/messages/conversations");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log("conversation fetch here",data);
				setConversations(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoadingConversations(false);
			}
		};

		getConversations();
	}, [showToast, setConversations]);


  const handleConversationSearch = async (e) =>{
      e.preventDefault();
      setSearchingUser(true);
      try {
         const res = await fetch(`/api/users/profile/${searchText}`);
         const searchUser = await res.json();
         if(searchUser.error){
          showToast("Error" , searchUser.error,"error");
          return
         }
        //   user is trying to message themselves
         const messagingyourself = searchUser._id === currentUser._id
         if(messagingyourself){
          showToast("Error" ,"You cannot message yourself" , "error");
          return;
         }
        //  user is already in a coversation with the seached user
         const conversationAlreadyExists = conversations.find(conversation => conversation.participants[0]._id === searchUser._id)
        if(conversationAlreadyExists){
            setSelectedConversation({
              _id: conversationAlreadyExists._id,
              userId: searchUser._id,
              username : searchUser.username,
              userProfilePic : searchUser.profilePic,
            })
            return;
        }
        
        const mockConversation = {
          mock: true,
          lastMessage : {
            text : " ",
            sender :"",
          },
          _id: Date.now(),
          participants:[
            {
              _id: searchUser._id,
          username: searchUser.username,
          profilePic : searchUser.profilePic,
            }
          ]
        }
        setConversations((prevConv)=>[...prevConv , mockConversation]);

      } catch (error) {
        showToast("Error", error.message, "error");
      }finally{
        setSearchingUser(false);
      }
  }

  return (
    <Box
      position="absolute"
      left="50%"
      w={{
        base: "100%",
        md: "80%",
        lg: "750px",
      }}
      p={4}
      transform="translateX(-50%)"
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx="auto"
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection="column"
          maxW={{ sm: "250px", md: "full" }}
          mx="auto"
        >
          <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
            Conversation
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems="center" gap={2}>
              <Input placeholder="Search for user" onChange={(e)=>setSearchText(e.target.value)} />
              <Button size="sm" onClick={handleConversationSearch} isLoading={searchingUser} >
                <SearchIcon />
              </Button>
            </Flex>
          </form>

          {loadingConversations && (
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex key={i} gap={4} alignItems="center" p="1" borderRadius="md">
                <Box>
                  <SkeletonCircle size="10" />
                </Box>
                <Flex w="full" flexDirection="column" gap={3}>
                  <Skeleton h="10px" w="80px" />
                  <Skeleton h="8px" w="90%" />
                  <Flex />
                  <Flex />
                </Flex>
              </Flex>
            ))
          )}

       {!loadingConversations &&
						conversations.map((conversation) => (
							<Conversation
								key={conversation._id}
								isOnline = {onlineUsers.includes(conversation.participants[0]._id)}
								conversation={conversation}
							/>
						))}   </Flex>
        {!selectedConversation._id && (
					<Flex
						flex={70}
						borderRadius={"md"}
						p={2}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						height={"400px"}
					>
						<GiConversation size={100} />
						<Text fontSize={20}>Select a conversation to start messaging</Text>
					</Flex>
				)}

				{selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};
