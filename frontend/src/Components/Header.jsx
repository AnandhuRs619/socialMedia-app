import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { useState } from "react";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [clickedIcon, setClickedIcon] = useState(null);

  return (
    <Flex justifyContent="space-between" ml={-200} mt={6} mb={12}>
      {/* Left image */}
      <Flex>
        <Image
          cursor={"pointer"}
          alt="logo"
          w={7}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          onClick={toggleColorMode}
        />
      </Flex>

      {/* Center images */}
      <Flex justifyContent="center" alignItems={'center'}>
        <Flex gap={4}>
          <Image
            cursor={"pointer"}
            alt="logo"
            w={7}
            src={"/hut (1).png"}
            onClick={() => {
              setClickedIcon("/hut (1).png"); // Set clicked icon state
            }}
            style={{
              fill: clickedIcon === "/hut (1).png" ? "white" : "black", // Conditional fill based on state
            }}
          />
          <Image
            cursor={"pointer"}
            alt="logo"
            w={7}
            src='/search (1).png'
            onClick={()=>setClickedIcon('/search (1).png')}
            style={{
              fill: clickedIcon === "/more (1).png" ? "white" : "black",
            }}
          />
          <Image
            cursor={"pointer"}
            alt="logo"
            w={7}
            src='/more (1).png'
            onClick={() => {
              setClickedIcon("/more (1).png");
            }}
            style={{
              fill: clickedIcon === "/more (1).png" ? "white" : "black",
            }}
          />
          <Image
          cursor={"pointer"}
          alt="logo"
          w={7}
          src='/user (1).png'
          onClick={() => {
            setClickedIcon("/user (1).png");
          }}
          style={{
            fill: clickedIcon === "/user (1).png" ? "white" : "black",
          }}
        />
        </Flex>
      </Flex>
    </Flex>
  );
};

