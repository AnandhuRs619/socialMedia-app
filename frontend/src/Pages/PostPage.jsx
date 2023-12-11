import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Actions } from "../Components/Action"
import { useState } from "react"
import { Comment } from "../Components/Comment"


export const PostPage = () => {
  const [liked,setLiked] =useState(false)
   return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={"center"} gap={3} >
          <Avatar src="/zuck-avatar.png" size={'md'} name="Mark ZUckerberg" />
          <Flex>
            <Text fontSize={'sm'}fontWeight={"bold"} >mark zuckerberg </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
          </Flex>
          <Flex gap={4} alignItems={'center'}>
            <Text fontSize={'sm'} color={'gary.light'} > 1d</Text>
              <BsThreeDots/>
        </Flex>
      </Flex>
        <Text my={3} > lets talk about Treads.</Text>
        <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'} >
          <Image src="/post1.png" w={'full'} />
        </Box>
        <Flex gap={3} my={3} >
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={'center'} >
          <Text color={'gray.light'} fontSize={'sm'} >283 replies</Text>
          <Box w={0.5} h={0.5} borderRadius={"full"} bg={'gray.light'} ></Box> 
          <Text color={'gray.light'} fontSize={'sm'}>
            {200+(liked ? 1:0)} likes
          </Text>
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
        <Comment  
         Comment = 'thing just got out of hand '
         createdAt = '3d'
         likes = {212}
         username = 'Dr Strange'
         userAvatar = 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Benedict_Cumberbatch_as_Doctor_Strange.jpeg/220px-Benedict_Cumberbatch_as_Doctor_Strange.jpeg'
         />
        <Comment  
         Comment = ' X is better than this dumb '
         createdAt = '1h'
         likes = {52}
         username = 'Elon Musk'
         userAvatar = 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/2400x1600/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/23906799/VRG_Illo_STK022_K_Radtke_Musk_Crazy.jpg'
         />
         <Comment  
         Comment = 'just bring it '
         createdAt = '1d'
         likes = {12}
         username = 'The Rock'
         userAvatar = 'https://www.denofgeek.com/wp-content/uploads/2021/11/Webstory-the-rock-GettyImages-1236337133-cover@0.5x.jpg'
         />
    </>
  )
}
