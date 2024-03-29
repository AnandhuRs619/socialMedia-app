// import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs'
import usePreviewImg from '../hooks/usePreviewImg';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { postsAtom } from '../atoms/postAtom';
import { useParams } from 'react-router-dom';
const postIcon = "/more (1).png";
const MAX_CHAR = 500;

export const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText , setPostText] = useState('');
    const { imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingChar,setRemainingChar] =useState(MAX_CHAR)
    const [loading,setLoading]=useState(false)
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const [posts,setPosts] = useRecoilState(postsAtom);
    const {username} = useParams();

    const handleTextChange = (e)  => {
        const inputText = e.target.value
        if(inputText.length >MAX_CHAR){
            const truncatedText = inputText.slice(0,MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0)
        }else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR-inputText.length);
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = async()=>{
        setLoading(true);
        try {
            const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user._id, text: postText, file: imgUrl }),
			});

            const data = await res.json();
    
            if(data.error){
                showToast("Error" , data.error,"error")
                return
            }
            showToast("Success","Post created successfully" , "success")
            if(username === user.username){
                
                setPosts([data,...posts]);
            }
            onClose();
            setPostText("");
            setImgUrl("");

        } catch (error) {
            
            showToast("Error" , error,"error")
        }finally{
            setLoading(false)
        }
    }

  return (
    <Flex alignItems={{ base: "center", md: "inherit" }} justifyContent={'center'} >
    <Button
    size={"1"}
     position={"absolute"} 
     bg={useColorModeValue("gray.300","gray.dark")} 
     onClick={onOpen}
      > <Image
      boxSize="1.5rem"  
      src={postIcon}
      alt="Post Icon"
    /> </Button>
       <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Textarea
								placeholder='Post content goes here..'
								onChange={handleTextChange}
								value={postText}
							/>
							<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
								{remainingChar}/{MAX_CHAR}
							</Text>

                            <Input type='file' hidden ref={imageRef} onChange={handleFileChange} accept="image/*, video/*" />

							<BsFillImageFill
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={16}
								onClick={() => imageRef.current.click()}
							/>
						</FormControl>

						{imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                {imgUrl.startsWith('data:image') ? (
                                    <Image src={imgUrl} alt='Selected img' />
                                ) : (
                                    <video width="320" height="240" controls>
                                        <source src={imgUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                <CloseButton
                                    onClick={() => {
                                        setImgUrl("");
                                    }}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading} >
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
            </Flex>
  )
}
