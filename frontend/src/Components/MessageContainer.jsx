import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react"
import { Message } from "./Message"
import { MessageInput } from "./MessageInput"
import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast"
import {  useRecoilValue } from "recoil"
import { selectedConversationAtom } from "../atoms/messagesAtom"
import userAtom from "../atoms/userAtom"


export const MessageContainer = () => {
 const showToast = useShowToast();
 const selectedConversation = useRecoilValue(selectedConversationAtom);
 const [loadingMessages,setLoadingMessages] = useState(true)
 const [messages, setMessages] = useState([]);
 const currentUser =  useRecoilValue(userAtom);
console.log(selectedConversation)
  useEffect(()=>{
    const getMessages = async() =>{
      setLoadingMessages(true);
      setMessages([]);
      try {
        if(selectedConversation.mock) return ;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`)
        const data = await res.json()
        console.log(selectedConversation)
        if(data.error){
          showToast("Error",data.error,"error");
          return;

        }
        setMessages(data);
        console.log("full chat",data)
      } catch (error) {
        showToast("Error" , error.message,"error")
      }finally{
        setLoadingMessages(false)
      }
    }
    getMessages();
  },[showToast,selectedConversation.userId]);
  return (
    <Flex flex={"70%"} bg={useColorModeValue("gray.200","gray.dark")} 
    borderRadius={"md"} p={2} flexDirection={"column"} >
        {/* Message Header */}
        <Flex gap={2} w={"full"} h={12} alignItems={"center"}>
        <Avatar src={selectedConversation.userProfilePic} size={"sm"}/>
        <Text display={"flex"}  alignItems={"center"}> 
        {selectedConversation.username} <Image src="/verified.png" w={4} ml={"1"} /></Text>
        </Flex>
        <Divider/>
        {/* Messages */}

        <Flex flexDir={"column"} gap={4} p={2} my={4}
        h={"400px"} overflow={"auto"}
        >
            {loadingMessages && 
                [...Array(5)].map((_, i) => (
						<Flex
							key={i}
							gap={2}
							alignItems={"center"}
							p={1}
							borderRadius={"md"}
							alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
						>
							{i % 2 === 0 && <SkeletonCircle size={7} />}
							<Flex flexDir={"column"} gap={2}>
								<Skeleton h='8px' w='250px' />
								<Skeleton h='8px' w='250px' />
								<Skeleton h='8px' w='250px' />
							</Flex>
							{i % 2 !== 0 && <SkeletonCircle size={7} />}
						</Flex>
					))}

          {!loadingMessages && (
            messages.map((message)=>(
              <Message key={message._id} message={message} ownMessage={currentUser._id === message.sender}/>
            ))
          )}
                    
                   
        </Flex>
        <MessageInput setMessages ={setMessages} />
    </Flex>
  )
}
