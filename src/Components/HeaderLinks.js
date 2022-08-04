import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

function HeaderLinks({ active = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Stack
      w="100%"
      alignItems={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      px={{ base: "20px", md: "50px" }}
      py="22px"
    >
      <Text
        fontFamily="Roboto"
        color="#1A0B5B"
        fontSize={"30px"}
        fontWeight="900"
      >
        Megs Stores
      </Text>
      <Stack
        pl={{ base: "0px", md: "8%" }}
        direction={{ base: "column", md: "row" }}
        spacing="25px"
      >
        <Link to="/">
          <Text
            fontWeight={"500"}
            color={active === "home" ? "#FB2E86" : "#0D0E43"}
          >
            Home
          </Text>
        </Link>

        <Link to="/products">
          <Text
            _hover={{ color: "#FB2E86" }}
            fontWeight={"500"}
            color={active === "products" ? "#FB2E86" : "#0D0E43"}
          >
            Products
          </Text>
        </Link>
        {isLoggedIn && (
          <Link
            _hover={{ color: "#FB2E86", textDecoration: "none" }}
            to="/contact"
          >
            <Text
              _hover={{ color: "#FB2E86" }}
              fontWeight={"500"}
              color={active === "contact" ? "#FB2E86" : "#0D0E43"}
            >
              Contact
            </Text>
          </Link>
        )}

        <Link to="#">
          <Text
            _hover={{ color: "#FB2E86" }}
            fontWeight={"500"}
            color={active === "blog" ? "#FB2E86" : "#0D0E43"}
          >
            Blog
          </Text>
        </Link>
      </Stack>
      <Spacer />
      <InputGroup w="220px">
        <InputRightElement
          bg="#FB2E86"
          color="white"
          cursor="pointer"
          borderEndRadius="8px"
          children={<BiSearch />}
        />
        <Input type="text" />
      </InputGroup>
    </Stack>
  );
}

export default HeaderLinks;
