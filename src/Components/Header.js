import {
  Box,
  HStack,
  Select,
  Text,
  Stack,
  Spacer,
  useDisclosure,
  ScaleFade,
  Avatar,
  Drawer,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  BiEnvelope,
  BiPhoneCall,
  BiUser,
  BiCart,
  BiMenu,
} from "react-icons/bi";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import ScrollToTop from "react-scroll-to-top";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const [isLoggedin, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [stickNav, setStickNav] = useState(false);
  // const { isOpen, onToggle } = useDisclosure();

  const { items, totalUniqueItems, isEmpty } = useCart();
  const checkIfLogged = () => {
    let user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
      let userObj = JSON.parse(user);
      setUserMail(userObj.email);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // makes the navbar sticks on scroll
  const scrollEvent = () => {
    const scrolling = window.scrollY;
    if (scrolling >= 420) {
      setStickNav(true);
    } else {
      setStickNav(false);
    }
  };

  useEffect(() => {
    checkIfLogged();

    window.addEventListener("scroll", scrollEvent);
  }, []);

  return (
    <React.Fragment>
      <Stack
        w="100%"
        bg="#7E33E0"
        px={{ base: "20px", md: "50px" }}
        py={{ base: "10px", md: "10px" }}
        alignItems={{ base: "flex-start", md: "center" }}
        flexWrap="wrap"
        direction={{ base: "column", md: "row" }}
        position={stickNav ? "fixed" : "initial"}
        zIndex={stickNav ? 2 : "initial"}
      >
        {!isOpen ? (
          <Box
            onClick={onOpen}
            ref={btnRef}
            cursor={"pointer"}
            display={{ base: "flex", md: "none" }}
          >
            <BiMenu size={"35px"} color="white" />
          </Box>
        ) : (
          <Box
            onClick={onOpen}
            cursor={"pointer"}
            display={{ base: "flex", md: "none" }}
          >
            <HiMenuAlt1 size={"35px"} color="white" />
          </Box>
        )}
        {/* {!isOpen ? (
        <Box
          onClick={onToggle}
          cursor={"pointer"}
          display={{ base: "flex", md: "none" }}
        >
          <BiMenu size={"35px"} color="white" />
        </Box>
      ) : (
        <Box
          onClick={onToggle}
          cursor={"pointer"}
          display={{ base: "flex", md: "none" }}
        >
          <HiMenuAlt1 size={"35px"} color="white" />
        </Box>
      )} */}

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton size={"lg"}>
              <HiMenuAlt1 color="white" onClick={onClose} size={"40px"} />
            </DrawerCloseButton>

            <DrawerBody bg="#7E33E0">
              <Box>
                <Stack
                  ml={{ base: "0px", md: "30%" }}
                  direction={["column"]}
                  spacing="25px"
                  pt="25px"
                >
                  <HStack mt="30px">
                    <BiEnvelope size={"24px"} color="white" />
                    <Text color="white" fontWeight="bold" fontSize="20px">
                      {userMail || "example@gmail.com"}
                    </Text>
                  </HStack>
                  <HStack ml={{ base: "0px", md: "60px" }}>
                    <BiPhoneCall size={"24px"} color="white" />
                    <Text color="white" fontWeight="bold" fontSize="20px">
                      080300xxxxxxx
                    </Text>
                  </HStack>
                </Stack>
                <Stack
                  ml={{ base: "0px", md: "30%" }}
                  direction={["column"]}
                  spacing="25px"
                  pt="25px"
                >
                  <Select
                    color="white"
                    fontWeight="bold"
                    fontSize="20px"
                    w="120px"
                    placeholder="English"
                  >
                    <option>English</option>
                    <option>Yorùbá</option>
                  </Select>
                  <HStack>
                    {!isLoggedin ? (
                      <Link to="/login">
                        <Text color="white" fontWeight="bold" fontSize="20px">
                          Login
                        </Text>
                      </Link>
                    ) : (
                      <Box cursor="pointer" onClick={logout}>
                        <Text color="white" fontWeight="bold" fontSize="20px">
                          Logout
                        </Text>
                      </Box>
                    )}

                    <BiUser size={"24px"} color="white" />
                  </HStack>
                  <HStack cursor={"pointer"}>
                    <Link to="/cart">
                      <BiCart size={"30px"} color="white" />
                    </Link>
                    <Link to="/cart">
                      {!isEmpty && (
                        <Avatar
                          bg="red"
                          size="sm"
                          name={String(totalUniqueItems)}
                        />
                      )}
                    </Link>
                  </HStack>
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* {isOpen && (
        <ScaleFade
          display={{ base: "block", md: "none" }}
          bg="#7E33E0"
          w="100%"
          initialScale={0.9}
          in={isOpen}
        >
          <Box transition={"0.3s ease"} display={{ base: "block", md: "none" }}>
            <Stack
              ml={{ base: "0px", md: "30%" }}
              direction={["column"]}
              spacing="25px"
              pt="25px"
            >
              <HStack>
                <BiEnvelope size={"24px"} color="white" />
                <Text color="white" fontSize={"18px"}>
                  {userMail || "example@gmail.com"}
                </Text>
              </HStack>
              <HStack ml={{ base: "0px", md: "60px" }}>
                <BiPhoneCall size={"24px"} color="white" />
                <Text color="white" fontSize={"18px"}>
                  080300xxxxxxx
                </Text>
              </HStack>
            </Stack>
            <Stack
              ml={{ base: "0px", md: "30%" }}
              direction={["column"]}
              spacing="25px"
              pt="25px"
            >
              <Select
                color="white"
                fontSize={"18px"}
                w="120px"
                placeholder="English"
              >
                <option>English</option>
                <option>Yorùbá</option>
              </Select>
              <HStack>
                {!isLoggedin ? (
                  <Link to="/login">
                    <Text color="white" fontSize={"18px"}>
                      Login
                    </Text>
                  </Link>
                ) : (
                  <Box cursor="pointer" onClick={logout}>
                    <Text color="white" fontSize={"18px"}>
                      Logout
                    </Text>
                  </Box>
                )}

                <BiUser size={"24px"} color="white" />
              </HStack>
              <HStack cursor={"pointer"}>
                <Link to="/cart">
                  <BiCart size={"24px"} color="white" />
                </Link>
                <Link to="/cart">
                  {!isEmpty && (
                    <Avatar
                      bg="red"
                      size="sm"
                      name={String(totalUniqueItems)}
                    />
                  )}
                </Link>
              </HStack>
            </Stack>
          </Box>
        </ScaleFade>
      )} */}
        <HStack display={{ base: "none", md: "flex" }}>
          <BiEnvelope size={"24px"} color="white" />
          <Text color="white" fontSize={"18px"}>
            {userMail || "texample@gmail.com"}
          </Text>
        </HStack>

        <HStack
          display={{ base: "none", md: "flex" }}
          pl={{ base: "0px", md: "60px" }}
        >
          <BiPhoneCall size={"24px"} color="white" />
          <Text color="white" fontSize={"18px"}>
            080300000842
          </Text>
        </HStack>

        <Spacer />
        <Stack
          display={{ base: "none", md: "flex" }}
          ml={{ base: "0px", md: "30%" }}
          direction={["row"]}
          spacing="40px"
          // mt={{base: "70px", md: "0px"}}
        >
          <Select color="white" bg="#7E33E0" fontSize={"18px"} w="120px">
            <option>English</option>
            <option>Yorùbá</option>
          </Select>

          <HStack>
            {!isLoggedin ? (
              <Link to="/login">
                <Text color="white" fontSize={"18px"}>
                  Login
                </Text>
              </Link>
            ) : (
              <Box cursor="pointer" onClick={logout}>
                <Text color="white" fontSize={"18px"}>
                  Logout
                </Text>
              </Box>
            )}

            <BiUser size={"24px"} color="white" />
          </HStack>

          <HStack cursor={"pointer"}>
            <Link to="/cart">
              <Text color="white" fontSize={"18px"}>
                Cart
              </Text>
            </Link>
            <Link to="/cart">
              <BiCart size={"24px"} color="white" />
            </Link>
            <Link to="/cart">
              {!isEmpty && (
                <Avatar bg="red" size="sm" name={String(totalUniqueItems)} />
              )}
            </Link>
          </HStack>
        </Stack>
      </Stack>

      <ScrollToTop style={{ padding: "10px"}} component={<FaArrowAltCircleUp />} smooth />
    </React.Fragment>
  );
}

export default Header;
