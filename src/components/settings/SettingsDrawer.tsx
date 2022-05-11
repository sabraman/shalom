import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useColorMode,
  useDisclosure,
  useMediaQuery,
  MenuItem,
  Menu,
  MenuButton,
  IconButton,
  Image,
  Box,
  Flex,
  Text,
  MenuList,
  AspectRatio,
  Editable,
  Avatar,
  Img,
} from "@chakra-ui/react";
import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { query, collection, where } from "firebase/firestore";
import router from "next/router";
import { userInfo } from "os";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IoChevronBack, IoSettingsSharp } from "react-icons/io5";
import { FiFile } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { auth } from "../../../firebaseConfig";
import { db } from "../../../firebaseConfig";
import ProfiEditable from "./ProfileInfoEditable";
import { MdAddPhotoAlternate } from "react-icons/md";
import UserPhoto from "./UserPhoto";

export default function SettingsDrawer({
  type,
  title,
}: {
  type: "setting";
  title: string;
}) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isValid, setIsValid] = useState(true);
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where("email", "==", user.email))
  );
  const profilePhoto = foundUser?.[0].photoURL;

  const header = "Settings";
  return (
    <>
      <MenuItem
        onClick={onOpen}
        fontWeight="semibold"
        h="3rem"
        icon={<IoSettingsSharp />}
      >
        Settings
      </MenuItem>
      <Drawer
        colorScheme={colorMode}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={isMobile ? "full" : "lg"}
      >
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(15px)" />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader p="0">
            <Flex
              direction="row"
              p="1rem"
              justify="space-between"
              align="center"
            >
              {/* <Box bg={profilePhoto} w="100vw" h="50vh" pt="4rem" color="white"> */}
              <IconButton
                aria-label={"back"}
                icon={<IoChevronBack />}
                variant="ghost"
                size="lg"
                isRound
                onClick={onClose}
              />
              <Text fontSize="2xl">{foundUser?.[0].email}</Text>
              <Flex>
                <IconButton
								aria-label="Upload Photo"
								icon={<FiFile />}
								variant="ghost"
								size='lg'
								isRound
								></IconButton>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDotsVertical />}
                    variant="ghost"
                    size="lg"
                    isRound
                  />
                  <MenuList>
                    <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} color="red.500">
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              {console.log(foundUser?.[0])}
              {/* </Box> */}
            </Flex>
            <Flex direction="column" pos="relative">
              <AspectRatio ratio={1 / 1}>
                <Avatar
                  src={foundUser?.[0].photoURL}
                  // alt="User Picture"
                  borderRadius={0}
                  objectFit="cover"
                />
              </AspectRatio>
              <UserPhoto />
            </Flex>
            {/* <Image src= /> */}
          </DrawerHeader>

          <DrawerBody>
            {/* <ProfiEditable /> */}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
