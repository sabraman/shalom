import {
  Flex,
  Stack,
  Avatar,
  IconButton,
  Icon,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { IoSunny, IoMoon, IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { RiAccountCircleFill } from "react-icons/ri";

import { signOut } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebaseConfig";
import ChatModal from "./ChatModal";
import SingleChat from "./singleChats/SingleChat";
import ChatRooms from "./rooms/ChatRooms";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import SettingsDrawer from "./settings/SettingsDrawer";

const Sidebar = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [user] = useAuthState(auth);
  const router = useRouter();
  //get Collection Data for both chats & rooms
  const [chatValues] = useCollection(
    query(collection(db, "chats"), where("users", "array-contains", user.email))
  );
  const [roomValues] = useCollection(
    query(collection(db, "rooms"), where("users", "array-contains", user.email))
  );
  //Map over all the chat rooms to create sidebar Links for chatrooms
  const chats = chatValues?.docs.map((chat) => (
    <SingleChat key={chat.id} id={chat.id} users={chat.data().users} />
  ));
  const rooms = roomValues?.docs.map((room) => (
    <ChatRooms key={room.id} id={room.id} data={room.data()} />
  ));
  //Button to log users out and push to index page
  const handleLogOut = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <Flex
      height="100vh"
      minW="30vw"
      maxWidth={fullWidth ? "100vw" : "50vw"}
      width={fullWidth ? "100vw" : ""}
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Flex flexWrap="wrap" direction="column">
        <Flex justify="space-between" height="71px" align="center" p="10px">
          {/* <Avatar src={user.photoURL} /> */}
          {/* <IconButton
            size="lg"
            aria-label="Settings"
            icon={<Icon as={IoSettingsSharp} />}
            onClick={toggleColorMode}
            variant="ghost"
          /> */}
          <Menu>
            <MenuButton
              size="lg"
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
              isRound
            />
            <MenuList  bg={colorMode === "light" ? "whiteAlpha.600" : "blackApha.600"} backdropFilter="blur(8px)"  fontSize="medium" fontWeight="extrabold">
              <SettingsDrawer type={"setting"} title={''} />
              <MenuItem
                fontWeight="semibold"
                h="3rem"
                onClick={toggleColorMode}
                icon={<IoMoon />}
                closeOnSelect={false}
              >
                NightMode
                <Switch
                  right="1rem"
                  position="absolute"
                  isChecked={colorMode === "dark"}
                  // onChange={toggleColorMode}
                ></Switch>
              </MenuItem>
              <MenuItem
                fontWeight="semibold"
                h="3rem"
                onClick={handleLogOut}
                icon={<FiLogOut />}
                color="red.500"
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
          <Stack ml="2rem" maxWidth="50vw" direction="row" align="center">
            <ChatModal type="room" title="New Room" />
            <ChatModal type="chat" title="Add Person" />
            {/* <IconButton
              size="lg"
              aria-label="Sign Out"
              icon={<Icon as={FiLogOut} />}
              onClick={handleLogOut}
              isRound
            />
            <IconButton
              size="lg"
              aria-label="Toggle Dark Mode"
              icon={
                colorMode === "light" ? (
                  <Icon as={IoMoon} />
                ) : (
                  <Icon as={IoSunny} />
                )
              }
              onClick={toggleColorMode}
              isRound
            />
            <Avatar src={user.photoURL} /> */}
          </Stack>
        </Flex>
      </Flex>
      {/* <Stack direction="row" align="center" p="10px">
        <ChatModal type="room" title="New Room" />
        <ChatModal type="chat" title="Add Person" />
      </Stack> */}
      <Stack direction="column">
        {rooms}
        {chats}
      </Stack>
    </Flex>
  );
};
export default Sidebar;
