import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Bounce from "react-reveal/Bounce";

function Subscribe() {
  return (
    <Box  my="100px">
      <Box
        height={"300px"}
        position="relative"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage="url('/images/bg-pc.png')"
      >
        <Box py="60px" mx={{ md: "30%" }} w={{ base: "100%", md: "40%" }}>
          <Stack alignItems="center" direction={["column"]}>
            <Bounce left>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize={{base: "30px", md:"35px"}}
                color="#151875"
                justifyContent="center"
                mb="20px"
              >
                Get Latest Updates By Subscribing To Our Newsletter
              </Text>
            </Bounce>
            <Button
              _hover={{ color: "white", bg: "#FB2E86" }}
              w="200px"
              bg="#FB2E86"
              color="white"
            >
              Subscribe Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Subscribe;
