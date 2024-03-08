import  { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export const OtpCard = () => {
  const [timer, setTimer] = useState(60); 
  const [otpSent, setOtpSent] = useState(false); 

  // Function to handle OTP resend
  const handleResendOtp = () => {
    // Logic to resend OTP
    setOtpSent(true); // Assume OTP has been resent
    setTimer(60); // Reset the timer
  };

  // Effect to decrement timer every second
  useEffect(() => {
    if (timer > 0 && otpSent) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer, otpSent]);

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            OTP
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow="lg"
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Text textAlign="center" mb={4}>Enter your OTP</Text>
          <HStack justify="center"pt={5} spacing={4}>
            <PinInput otp>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Stack justify="center" spacing={10} pt={7}>
                    <Button
                    justifyContent={'center'}
                    
                        loadingText='Logging in'
                        size='lg'
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                            bg: useColorModeValue("gray.700", "gray.800"),
                        }}
                        
                        
                    >
                        Submit
                    </Button>
                </Stack>
          {timer > 0 ? (
            <Text textAlign="center" mt={4}>
              Resend OTP in {timer} seconds
            </Text>
          ) : (
            <Button
              mt={4}
              onClick={handleResendOtp}
              variant="link"
              color="blue.400"
              textAlign="center"
            >
              Resend OTP
            </Button>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};
