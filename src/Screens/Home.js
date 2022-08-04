import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  DrawerFooter,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import HomeCarousels from "../Components/HomeCarousels";
import LatestProducts from "../Components/LatestProducts";
import Subscribe from "../Components/Subscribe";
import RubberBand from "react-reveal/RubberBand";
import Fade from "react-reveal/Fade";
import Featured from "../Components/Featured";

function Home() {
  return (
    <Box w="100%">
      <Header />
      <HeaderLinks active="home" />
      <PageTitleBar pageTitle="Home" />
      <Box px={{ base: "20px", md: "50px" }}>
        <Fade left>
          <Text
            textAlign="center"
            my="30px"
            fontWeight="bold"
            fontSize={{ base: "20px", md: "30px" }}
            color="#1A0B5B"
          >
            Welcome to Megs Stores
          </Text>
        </Fade>
      </Box>

      <HomeCarousels />
      <Box px={{ base: "20px", md: "50px" }}>
        <RubberBand>
          <Text
            textAlign="center"
            my="30px"
            fontWeight="bold"
            fontSize="30px"
            color="#1A0B5B"
            fontFamily="Roboto"
          >
            Featured Products
          </Text>
        </RubberBand>
      </Box>
      <Featured />
      <Box px={{ base: "20px", md: "50px" }}>
        <RubberBand>
          <Text
            textAlign="center"
            my="30px"
            fontWeight="bold"
            fontSize="30px"
            color="#1A0B5B"
            fontFamily="Roboto"
          >
            Latest Products
          </Text>
        </RubberBand>
      </Box>
      <LatestProducts />

      <Subscribe />

      <Footer />
    </Box>
  );
}

export default Home;
