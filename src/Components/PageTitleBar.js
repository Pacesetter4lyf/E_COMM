import React from "react";
import { Box, Text } from "@chakra-ui/react";

function PageTitleBar({pageTitle = "Shop Left Sidebar"}) {
  return (
    <Box bg="#F6F5FF" w="100%" py="40px" px={{base: "20px", md:"50px"}}>
      <Text
        fontWeight={"bold"}
        fontFamily="Roboto"
        fontSize={"35px"}
        color="#FB2E86"
        textTransform={"capitalize"}
      >
        {pageTitle}
      </Text>
    </Box>
  );
}

export default PageTitleBar;
