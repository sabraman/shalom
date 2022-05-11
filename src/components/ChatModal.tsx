import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormErrorMessage,
  FormControl,
  useMediaQuery,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { validate } from "email-validator";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoPersonAdd } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { auth, db } from "../../firebaseConfig";
export default function ChatModal({
  type,
  title,
}: {
  type: "room" | "chat" | "addPeople";
  title: string;
}) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [chatName, setChatName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setChatName(e.currentTarget.value);
  };
  //if chat exits then dont create a new one
  //prompt for email address and also for room name
  const handleSubmit = async () => {
    const { email } = user;
    switch (type) {
      case "room":
        if (chatName !== "") {
          await addDoc(collection(db, "rooms"), {
            roomName: chatName,
            users: [email],
            lastSent: serverTimestamp(),
          });
          onClose();
        } else {
          setIsValid(false);
        }
        break;
      case "chat":
        if (validate(chatName)) {
          await addDoc(collection(db, "chats"), {
            users: [email, chatName],
            lastSent: serverTimestamp(),
          });
          onClose();
        } else {
          setIsValid(false);
        }
        break;
      case "addPeople":
        await updateDoc(doc(db, "rooms", id.toString()), {
          users: arrayUnion(chatName),
        });
        onClose();
    }
  };

  const header = type === "room" ? "Create New Room" : "Add Person To Chat";
  const placeHolder = type === "room" ? "Room Name" : "Email";

  return (
    <>
      <Tooltip
        label={isMobile ? "" : title}
        bg={colorMode === "light" ? "gray.800" : "gray.100"}
      >
        <Button size="lg" onClick={onOpen}>
          {isMobile ? (
            title
          ) : title === "New Room" ? (
            <MdCreateNewFolder />
          ) : (
            <IoPersonAdd />
          )}
        </Button>
      </Tooltip>
			<Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(15px)" />
				<ModalContent>

				</ModalContent>
			</Modal>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(15px)" />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!isValid}>
              <Input
                placeholder={placeHolder}
                value={chatName}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
              <FormErrorMessage>
                {type === "room" ? "Cannot be empty" : "Email is required"}.
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant="ghost">
              {type === "room"
                ? "Create Room"
                : type === "addPeople"
                ? "Add Person"
                : "Create Chat"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
