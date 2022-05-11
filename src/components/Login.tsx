import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Image } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";

export const Login = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [signup, setSignup] = useState(false);
  const { colorMode } = useColorMode();
  const [show, setShow] = useState(false);
  const bgLogin = { light: "gray.100", dark: "gray.800" };

  const signIn = () => {
    isMobile
      ? getRedirectResult(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;

				const user = result.user;
			}).catch(alert)
      : signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				const user = result.user;
				console.log(user);
				
			}).catch(alert);
  };

  const guestSign = () => {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "123456").catch(
      (error) => {
        console.log(error.message);
      }
    );
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signInEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
				console.log(user);
				// user.photoURL='https://bit.ly/2Z4KKcF';
				
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPass(e.target.value);
    }
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={bgLogin[colorMode]}
    >
      <Flex
        // shadow="dark-lg"
        minHeight="400px"
        h="100vh"
        w="60vh"
        direction={isMobile ? "column" : "row"}
        // bg="grey"
      >
        {/* <Image src='/login.jpg' alt='Plant In Vase' /> */}
        <Flex
          direction="column"
          paddingY="20px"
          paddingX="40px"
          bg={bgLogin[colorMode]}
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Heading
            position="relative"
            bottom="7vh"
            size="xl"
            textAlign="center"
          >
            PupuChat
          </Heading>
          <Input
            name="email"
            onChange={handleChange}
            size={isMobile ? "md" : "lg"}
						fontSize='1.4rem'
            placeholder="Username Or Email"
            variant="flushed"
            // height="4rem"
            mb="2rem"
          />
          <InputGroup size={isMobile ? "md" : "lg"}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              name="pass"
              onChange={handleChange}
							fontSize='1.4rem'
              // size={isMobile ? "lg" : "xl"}
              placeholder="Password"
              variant='flushed'
              // height="4rem"
              mb="1rem"
            />
            <InputRightElement width="4.5rem">
              <Button
                size={isMobile ? "sm" : "md"}
                onClick={() => setShow(!show)}
                variant="ghost"
								fontSize='1.5rem'
								// _hover={{ bg: 'transparent' }}
								// _active={{
								// 	bg: 'transparent',
								// 	borderColor: 'transparent',
								// }}
								_focus={{
									bg: 'transparent',
									borderColor: 'transparent',
								}}
              >
                {show ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <>
            <Flex
              w="100%"
              mt="1em"
              mb="1em"
              alignItems="center"
              direction="column"
            >
              {signup ? (
                <Button
                  onClick={createUser}
                  borderRadius="2rem"
                  w="70%"
                  pt="1rem"
                  pb="1rem"
									fontSize='1.5rem'
                  size={isMobile ? "md" : "lg"}
                  variant="outline"
                >
                  Sign up
                </Button>
              ) : (
                <>
                  <Button
                    mb="1em"
                    onClick={signInEmail}
                    borderRadius="2rem"
                    w="70%"
                    pt="1rem"
                    pb="1rem"
										fontSize='1.5rem'
                    size={isMobile ? "md" : "lg"}
                    variant="outline"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={guestSign}
                    borderRadius="2rem"
                    w="70%"
                    pt="1rem"
                    pb="1rem"
										fontSize='1.5rem'
                    size={isMobile ? "md" : "lg"}
                    variant="outline"
                  >
                    Guest Login
                  </Button>
                </>
              )}
            </Flex>
            <Stack mt="15px" mb="15px" direction="row" w="75%" align="center">
              <Divider color="white" />
              <Text>Or</Text>
              <Divider />
            </Stack>
            <Button
              leftIcon={<FcGoogle />}
              pt="1rem"
              pb="1rem"
              borderRadius="1rem"
              alignItems="center"
              onClick={signIn}
              variant="ghost"
              // _hover={{ transform: "translate(0, -5px)", shadow: "5px 5px 3px -1px rgb(0 0 0 / 20%), -3px -3px 3px -1px rgb(0 0 0 / 20%)" }}
              cursor="pointer"
              // boxSizing="border-box"
            >
              {/* <Icon mr="1rem" w="25px" h="25px" as={FcGoogle} /> */}
              Sign In With Google
            </Button>
            <Flex mt="15px">
              <Text fontSize="sm">
                {signup ? "Have An Account?" : "Need an account?"}{" "}
              </Text>
              <Text
                onClick={() => setSignup(!signup)}
                cursor="pointer"
                _hover={{ transform: "translate(0, -2px)", color: "orange" }}
                decoration="underline"
                fontSize="sm"
                ml="5px"
              >
                {signup ? "Login" : "Create Account"}
              </Text>
            </Flex>
          </>
        </Flex>
      </Flex>
      <DarkModeSwitch />
    </Flex>
  );
};
