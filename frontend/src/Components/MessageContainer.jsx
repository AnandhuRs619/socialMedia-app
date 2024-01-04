import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react"
import { Message } from "./Message"
import { MessageInput } from "./MessageInput"


export const MessageContainer = () => {
  return (
    <Flex flex={"70%"} bg={useColorModeValue("gray.200","gray.dark")} 
    borderRadius={"md"} p={2} flexDirection={"column"} >
        {/* Message Header */}
        <Flex gap={2} w={"full"} h={12} alignItems={"center"}>
        <Avatar src="" size={"sm"}/>
        <Text display={"flex"}  alignItems={"center"}> 
        Anandhu <Image src="/verified.png" w={4} ml={"1"} /></Text>
        </Flex>
        <Divider/>
        {/* Messages */}

        <Flex flexDir={"column"} gap={4} p={2} my={4}
        h={"400px"} overflow={"auto"}
        >
            {true && 
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
                    <Message ownMessage={true}/>
                    <Message ownMessage={false}/>
                    <Message ownMessage={false}/>
        </Flex>
        <MessageInput />
    </Flex>
  )
}
