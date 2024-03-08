import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";



export const ForgotPasswordCard = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs,setInputs] = useState({
       email:""
       
    })
    const showToast = useShowToast()
    const setUser = useSetRecoilState(userAtom)
    const [loading,setLoading]=useState(false);
    const handleLogin = async()=>{
        setLoading(true);
       try {
        setAuthScreen("otp")
        const res = await fetch("/api/users/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json",

            },
            body: JSON.stringify(inputs)
        });
        const data = await res.json();
        if(data.error){
            showToast("Error",data.error,"error");
            return;
        }
        localStorage.setItem("user-threads",JSON.stringify(data));
        setUser(data);
       } catch (error) {
        showToast("Error",error,"error")
       } finally{
        setLoading(false);
       } 
    }

  return (
    <Flex align={"center"} justify={"center"}>
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}>
            Reset Password 
            </Heading>
        </Stack>
        <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.dark")}
            boxShadow={"lg"}
            p={8}
            w={{
                base: "full",
                sm: "400px",
            }}
        >
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel> Email</FormLabel>
                    <Input
                        type='text'
                        value={inputs.email}
                        onChange={(e)=> setInputs({...inputs, email: e.target.value})}
                        
                    />
                </FormControl>
              
             
                <Stack spacing={10} pt={2}>
                    <Button
                        loadingText='Logging in'
                        size='lg'
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                            bg: useColorModeValue("gray.700", "gray.800"),
                        }}
                        onClick={handleLogin}
                        isLoading={loading}
                    >
                        Submit
                    </Button>
                </Stack>
                
                <Stack pt={6}>
                    <Text align={"center"}>
                        Don&apos;t have an account?{" "}
                        <Link color={"blue.400"}  onClick={()=>setAuthScreen("signup")}>
                            Sign up 
                        </Link>
                    </Text>
                </Stack>
            </Stack>
        </Box>
    </Stack>
</Flex>
  )
}
