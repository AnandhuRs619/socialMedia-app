import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import { CreatePost } from "./CreatePost";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      direction={{ base: "column", md: "row" }} // Column for mobile, row for other screen sizes
      justifyContent="space-between"
      alignItems="center"
      mt={6}
      mb={12}
      textAlign={{ base: "center", md: "left" }} // Center text for mobile, left-align for other screen sizes
    >
      <Image
        cursor="pointer"
        alt="logo"
        w={150}
        mb={{ base: 4, md: 0 }} // Add margin bottom for mobile only
        src={colorMode === "dark" ? "/Black Link - White.png" : "/Black Link - Black.png"}
        onClick={toggleColorMode}
      />

      {user && (
        <Flex alignItems={{ base: "center", md: "flex-start" }} gap={10}>
          <Link as={RouterLink} to="/" fontSize="lg">
            <AiFillHome size={24} />
          </Link>
          <CreatePost />
          <Link as={RouterLink} to={`/${user.username}`} fontSize="lg">
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`} fontSize="lg">
            <BsFillChatQuoteFill size={24} />
          </Link>
          <Link as={RouterLink} to={`/settings`} fontSize="lg">
            <MdOutlineSettings size={24} />
          </Link>
          <Button size="xs" onClick={logout} fontSize="lg">
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Flex direction="column" gap={5} alignItems="center">
          <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")} fontSize="lg">
            Login
          </Link>
          <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")} fontSize="lg">
            Sign up
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
